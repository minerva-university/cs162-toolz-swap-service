import jwt
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response

from .models import User

JWT_SECRET_KEY = settings.JWT_SECRET_KEY


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
        try:
            token = request.headers["Token"]
            member_id = request.headers["Member-Id"]
            user_id = int(request.headers["User-Id"])
            decoded_token = jwt.decode(
                token,
                JWT_SECRET_KEY,
                algorithms="HS256"
            ),
            presented_valid_credentials = (
                                                  decoded_token[0] == {"member_id": member_id}
                                          ) and (
                                                  member_id == User.objects.get(pk=user_id).username
                                          )  # check if this user's id matches the username
            if presented_valid_credentials:  # User presented valid credentials
                return function(request, *args, **kwargs)
            else:
                return Response(incorrect_credentials_error, status=status.HTTP_403_FORBIDDEN)

        except Exception as e:
            print(e)  # user is logged in
            return Response(login_required_error, status=status.HTTP_403_FORBIDDEN)
    return wrapper
