import datetime
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
from .models import User
from .serializers import UserSerializer

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
