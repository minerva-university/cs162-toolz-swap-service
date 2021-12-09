from django.test import TestCase, RequestFactory
from .views import users_view


class TestUserCrud(TestCase):
    def setUp(self):
        self.BASE_URL = "http://127.0.0.1:8000/"
        self.factory = RequestFactory()

    def test_signup_successful(self):
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

    def test_signup_for_existing_user_fails(self):
        path = 'api/users'
        endpoint = self.BASE_URL + path
        data = {
            "username": "TestUser1",
            "password1": "thisisatestuser",
            "email": "test_user1@gmail.com",
            "password2": "thisisatestuser"}
        r = self.factory.post(endpoint, data=data)
        response = users_view(r)
        self.assertEqual(response.status_code, 201)
        #  User has been created, trying to signup with username should fail
        r = self.factory.post(endpoint, data=data)
        response = users_view(r)
        self.assertEqual(response.status_code, 400)
        errors = response.data["errors"]["username"]
        self.assertTrue("A user with that username already exists." in errors)

    def test_get_all_users_successful(self):
        # Create a test User
        path = 'api/users'
        endpoint = self.BASE_URL + path
        data = {
            "username": "TestUser1",
            "password1": "thisisatestuser",
            "email": "test_user1@gmail.com",
            "password2": "thisisatestuser"}
        r = self.factory.post(endpoint, data=data)
        response = users_view(r)
        self.assertEqual(response.status_code, 201)
        #  User has been created, there should only be 1 user
        r = self.factory.get(endpoint)
        response = users_view(r)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) == 1)
