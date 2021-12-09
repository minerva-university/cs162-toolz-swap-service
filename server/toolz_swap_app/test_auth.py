from django.test import TestCase, RequestFactory
from .views import login, logout, users_view, JWT_SECRET_KEY


class TestAuth(TestCase):
    def setUp(self):
        self.BASE_URL = "http://127.0.0.1:8000/"
        self.factory = RequestFactory()

    def test_login_successful(self):
        # Signup User
        path = 'api/users'
        endpoint = self.BASE_URL + path
        data = {
            "username": "TestUser2",
            "password1": "thisisatestuser",
            "email": "test_user1@gmail.com",
            "password2": "thisisatestuser"}
        r = self.factory.post(endpoint, data=data)
        response = users_view(r)
        self.assertEqual(response.status_code, 201)

        # Login User
        login_endpoint = self.BASE_URL + 'auth/login'
        data = {
            "username": "TestUser2"
        }

