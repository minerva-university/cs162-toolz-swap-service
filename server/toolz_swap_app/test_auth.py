import jwt
from django.test import TestCase, RequestFactory

from .views import login, logout, users_view, JWT_SECRET_KEY


class TestAuth(TestCase):
    def setUp(self):
        self.BASE_URL = "http://127.0.0.1:8000/"
        self.factory = RequestFactory()
        self.login_data = {
            "username": "TestUser2",
            "password": "thisisatestuser"
        }

        self.signup_data = {
            "username": "TestUser2",
            "password1": "thisisatestuser",
            "email": "test_user1@gmail.com",
            "password2": "thisisatestuser"}

        self.decoded_token = {
            "member_id": "TestUser2"
        }

    def _signup(self):
        # Signup User
        path = 'api/users'
        endpoint = self.BASE_URL + path
        r = self.factory.post(endpoint, data=self.signup_data)
        response = users_view(r)
        self.assertEqual(response.status_code, 201)

    def _login(self):
        login_endpoint = self.BASE_URL + 'auth/login'
        r = self.factory.post(login_endpoint, data=self.login_data)
        response = login(r)
        return response

    def _logout(self):
        logout_endpoint = self.BASE_URL + 'auth/logout'
        r = self.factory.get(logout_endpoint)
        response = logout(r)
        return response

    def test_login_successful(self):
        self._signup()
        response = self._login()
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
        self._signup()
        self._login()
        response = self._logout()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data.get("token") is None)
        self.assertTrue(response.data.get("member_id") is None)
        self.assertTrue(response.data.get("user_id") is None)
        self.assertTrue(response.data.get("message") is not None)
        self.assertEqual(response.data.get("message"), "Logout Successful")

