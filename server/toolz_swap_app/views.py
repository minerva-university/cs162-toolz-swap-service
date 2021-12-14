import datetime
import uuid
from importlib import import_module

import jwt
from django.conf import settings
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .decorators import custom_login_required
from .forms import SignUpForm
from .queries import *
from .serializers import *

JWT_SECRET_KEY = settings.JWT_SECRET_KEY
INVALIDATED_TOKENS = settings.INVALIDATED_TOKENS
SessionStore = import_module(settings.SESSION_ENGINE).SessionStore


def signup(request):
    """
    Creates a new user and stores in the database
    :param: request:rest_framework.request.Request
    :returns: django-rest-framework Response object
    """
    form = SignUpForm(request.data)
    if form.is_valid():  # input is valid
        form.save()
        return Response(request.data, status=status.HTTP_201_CREATED)
    errors = {
        "errors": form.errors
    }
    return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    """
    Logs a user in and adds a signed JWT token to the user's session
    :param: request:rest_framework.request.Request
    :return: django-rest-framework Response object
    """
    try:
        username = request.data['username']
        password = request.data['password']
        user_does_not_exist = User.objects.filter(username=username).first() is None
        if user_does_not_exist:
            message = {
                "message": "User doesn't exist, signup instead"
            }
            return Response(message, status=status.HTTP_404_NOT_FOUND)
        user = authenticate(username=username, password=password)
        if user is not None:
            token = jwt.encode(
                {
                    "member_id": username,
                    "exp": timezone.now() + datetime.timedelta(minutes=90),  # token expires after 90 mins
                },
                key=JWT_SECRET_KEY,
                algorithm="HS256"
            )  # logged in requests must present this token as a credential in the Authentication header
            if token in INVALIDATED_TOKENS:
                INVALIDATED_TOKENS.remove(token)  # make this toke valid again
            session = SessionStore()
            session["token"] = token
            session["user_id"] = user.id
            session["member_id"] = username
            return Response(session, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_403_FORBIDDEN)
    except KeyError as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@custom_login_required  # need to be logged in to logout
def logout(request, invalidated_token_cache=INVALIDATED_TOKENS):
    """
    Logs a User Out and deletes the user's session data
    """
    token = request.headers["Token"]  # custom_login_required validates that we have a Token in request header
    INVALIDATED_TOKENS.add(token)
    session = SessionStore()
    session["message"] = "Logout Successful"
    return Response(session, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def users_view(request):
    """
    If request's method is GET , it returns all users
    If method is POST, it creates a new user
    :param: request:rest_framework.request.Request'
    :returns django-rest-framework Response object
    """
    if request.method == 'GET':
        return get_all_users(request)
    elif request.method == 'POST':
        return signup(request)


@custom_login_required
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'POST', 'DELETE'])
@custom_login_required
def listing_view(request):
    url_params = request.query_params
    pk = int(url_params.get('pk'))
    if request.method == 'GET':
        return get_listing(pk)
    elif request.method == 'PUT':
        return update_listing(request.data)
    elif request.method == "POST":
        return create_listing(request.data)
    elif request.method == 'DELETE':  # doesn't have a pk query_param
        if pk is not None:
            serializer = ListingSerializer(data=request.data)
            serializer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


def update_listing(data):
    listing_id = data.get("listing_id")
    if listing_id is None:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    listing = get_listing_by_id(listing_id)
    if listing is None:
        return Response(status=status.HTTP_404_NOT_FOUND)
    for attribute in data:
        if attribute == "title":
            listing.title = data["title"]
        elif attribute == "owner":
            listing.owner = data["owner"]
        elif attribute == "brand":
            listing.brand == data["brand"]
        elif attribute == "tool_category":
            listing.tool_category = data["tool_category"]
        elif attribute == "description":
            listing.description = data["description"]
    listing.save()
    return Response(status=status.HTTP_201_CREATED)


def create_listing(data):
    listing_id = uuid.uuid4()
    # get owner's address, city, neighboorhod
    # store in a dictionary
    owner = get_user_by_id(data["owner"])
    city = owner.city
    created_on = timezone.now()
    listing_data = {
        "listing_id": listing_id,
        "address": "owner's address",
        "title": data["title"],
        "city": city
        "created_on": created_on
        # etc
    }
    serializer = ListingSerializer(data=listing_data)
    if serializer.is_valid():
        serializer.save()  # creates a new listing
        return Response(serializer.data, status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_listing(pk):
    if pk is not None:  # get request asks for a specific listing by pk
        listing = get_listing_by_id(pk)
        if listing is not None:  # listing with id = pk exists in db
            serializer = ListingSerializer(listing)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:  # listing with id = pk doesn't exist in db
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        listings = get_all_listings()  # request for all listings in db
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@custom_login_required
def get_all_cities_view(request):
    cities = get_all_cities()
    serializer = CitySerializer(cities, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@custom_login_required
def get_all_neighborhoods_view(request):
    neighborhoods = Neighborhood.objects.all()
    serializer = NeighborhoodSerializer(neighborhoods, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
