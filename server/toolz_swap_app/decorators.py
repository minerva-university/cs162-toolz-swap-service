import jwt
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response

from .models import User

JWT_SECRET_KEY = settings.JWT_SECRET_KEY
INVALIDATED_TOKENS = settings.INVALIDATED_TOKENS


def custom_login_required(function):
    """
    Decorator to check that a user is logged in to make an api request
    User must present valid credentials in the request header
    :params: function: function - api view function
    :returns: Response
    """

    def wrapper(request, *args, **kwargs):
        login_required_error = {
            "error": "Login Required!"
        }
        incorrect_credentials_error = {
            "error": "Incorrect credentials passed for request!"
        }
        credentials_expired_error = {
            "error": "Credentials expired! Pls login!"
        }
        if args:
            invalidated_token_cache = args[0]  # for test purposes, an empty set is passed
        else:
            invalidated_token_cache = INVALIDATED_TOKENS  # development/production cache
        try:
            token = request.headers["Token"]
            member_id = request.headers["Member-Id"]
            user_id = int(request.headers["User-Id"])
            try:
                decoded_token = jwt.decode(
                    token,
                    JWT_SECRET_KEY,
                    algorithms="HS256"
                ),
                presented_valid_credentials = (
                                                      decoded_token[0]["member_id"] == member_id
                                              ) and (
                                                      member_id == User.objects.get(pk=user_id).username
                                              ) and token not in invalidated_token_cache
                if presented_valid_credentials:  # User presented valid credentials
                    return function(request, *args, **kwargs)
                else:
                    return Response(incorrect_credentials_error, status=status.HTTP_403_FORBIDDEN)
            except jwt.ExpiredSignatureError:
                return Response(credentials_expired_error, status=status.HTTP_403_FORBIDDEN)

        except Exception as e:
            print(e, "error!")  # user is not logged in
            return Response(login_required_error, status=status.HTTP_403_FORBIDDEN)

    return wrapper
