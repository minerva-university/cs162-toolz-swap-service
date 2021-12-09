import jwt
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .forms import SignUpForm
from .models import User
from .serializers import UserSerializer

JWT_SECRET_KEY = settings.JWT_SECRET_KEY


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
    username = request.data['username']
    password = request.data['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        token = jwt.encode(
            {
                "member_id": username
            },
            key=JWT_SECRET_KEY,
            algorithm="HS256"
        )  # logged in requests must present this token as a credential in the Authentication header
        request.session['token'] = token
        request.session["user_id"] = user.id
        return Response(request.session, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def logout(request):
    """
    Logs a User Out and deletes the user's session data
    """
    request.session.flush()
    response = {
        "message": "Logout Successful"
    }
    return Response(response, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def users_view(request):
    """
    If request's method is GET , it returns all users
    If method is POST, it creates a new user
    :param: request:rest_framework.request.Request'
    :returns django-rest-framework Response object
    """
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        return signup(request)
