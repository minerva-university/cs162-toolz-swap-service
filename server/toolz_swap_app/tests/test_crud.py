from django.test import TestCase

from .test_accessories import BASE_URL, signup_data, login_data, decoded_token, \
    factory, _signup, header_with_valid_credentials
from toolz_swap_app.views import users_view


class TestUserCrud(TestCase):
    def setUp(self):
        self.endpoint = BASE_URL + 'api/user'
        self.factory = factory
        self.login_data = login_data
        self.signup_data = signup_data
        self.decoded_token = decoded_token

    def test_signup_successful(self):
        response = _signup()
        self.assertEqual(response.status_code, 201)

    def test_signup_for_existing_user_fails(self):
        #  User has been created, trying to signup with username should fail
        _signup()
        r = self.factory.post(self.endpoint, data=self.signup_data)
        response = users_view(r)
        self.assertEqual(response.status_code, 400)
        errors = response.data["errors"]["username"]
        self.assertTrue("A user with that username already exists." in errors)

    def test_get_all_users_successful(self):
        # you need to be logged in to call this endpoint
        mock_request_headers = header_with_valid_credentials()  # sign up, login and add credentials
        auth_header = {
            "HTTP_Member-Id": mock_request_headers.headers["Member-Id"],
            "HTTP_Token": mock_request_headers.headers["Token"],
            "HTTP_User-Id": mock_request_headers.headers["User-Id"]
        }

        r = self.factory.get(self.endpoint, **auth_header)
        response = users_view(r)
        self.assertEqual(response.status_code, 200)
        #  User has been created, there should only be 1 user
        self.assertTrue(len(response.data) == 1)

    def test_get_all_users_unsuccessful(self):
        # user attempts to call endpoint without being logged in
        r = self.factory.get(self.endpoint)
        response = users_view(r)
        self.assertEqual(response.status_code, 403)  # expect forbidden response
