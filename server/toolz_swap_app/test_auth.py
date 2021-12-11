import jwt
from django.test import TestCase

from .test_accessories import BASE_URL, signup_data, login_data, decoded_token, \
    factory, _signup, _login, _logout, header_with_valid_credentials, mock_view_function
from .views import JWT_SECRET_KEY


class TestAuth(TestCase):
    def setUp(self):
        self.BASE_URL = BASE_URL
        self.factory = factory
        self.login_data = login_data
        self.signup_data = signup_data
        self.decoded_token = decoded_token

    def test_login_successful(self):
        _signup()
        response = _login()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data.get("token") is not None)
        self.assertTrue(response.data.get("member_id") is not None)
        self.assertTrue(response.data.get("user_id") is not None)
        self.assertTrue(response.data.get("member_id") == "TestUser2")
        self.assertTrue(
            jwt.decode(
                response.data.get("token"),
                JWT_SECRET_KEY,
                algorithms="HS256"
            ),
            self.decoded_token
        )  # check that correctly signed credential belongs to the user

    def test_logout(self):
        _signup()
        _login()
        response = _logout()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data.get("token") is None)
        self.assertTrue(response.data.get("member_id") is None)
        self.assertTrue(response.data.get("user_id") is None)
        self.assertTrue(response.data.get("message") is not None)
        self.assertEqual(response.data.get("message"), "Logout Successful")

    def test_login_required_successful(self):
        mock_request_headers = header_with_valid_credentials()  # signup, login and add credentials
        mock_http_successful_response = mock_view_function(mock_request_headers)
        #  if user is logged in, decorator should return the function's return value
        self.assertEqual(mock_http_successful_response, "this is a mock view function")

    def test_login_required_failed(self):
        _signup()
        _login()
        #  not logged in, return HTTP Forbidden status_code
        _logout()
        mock_http_forbidden_response = mock_view_function({})
        self.assertEqual(mock_http_forbidden_response.status_code, 403)
        self.assertEqual(mock_http_forbidden_response.data["error"], "Login Required!")
