from django.test import RequestFactory

from .decorators import custom_login_required
from .views import users_view, login, logout

BASE_URL = "http://127.0.0.1:8000/"
factory = RequestFactory()
login_data = {
    "username": "TestUser2",
    "password": "thisisatestuser"
}
signup_data = {
    "username": "TestUser2",
    "password1": "thisisatestuser",
    "email": "test_user1@gmail.com",
    "password2": "thisisatestuser"}
decoded_token = {
    "member_id": "TestUser2"
}


def _signup():
    signup_endpoint = BASE_URL + 'api/users'
    r = factory.post(signup_endpoint, data=signup_data)
    response = users_view(r)
    return response


def _login():
    login_endpoint = BASE_URL + 'auth/login'
    r = factory.post(login_endpoint, data=login_data)
    response = login(r)
    return response


def _logout():
    logout_endpoint = BASE_URL + 'auth/logout'
    r = factory.get(logout_endpoint)
    response = logout(r)
    return response


def header_with_valid_credentials():
    _signup()
    login_response = _login()
    valid_token = login_response.data.get("token")
    valid_member_id = login_response.data.get("member_id")
    valid_user_id = login_response.data.get("user_id")
    mock_request_headers = MockRequestHeader(valid_token, valid_member_id, valid_user_id)
    return mock_request_headers


@custom_login_required
def mock_view_function(request):
    """
    Function to mock a view function with a mock HTTP request
    """
    return "this is a mock view function"


class MockRequestHeader:
    """
    Mock Request Header class for testing
    """

    def __init__(self, mock_token, mock_member_id, mock_user_id):
        self.headers = {
            "Content-Length": '',
            'Content-Type': 'application/json',
            'Host': '127.0.0.1:8000',
            'Cookie': 'SameSite=Lax; sessionid=kx61tuqigxcj014s7c66tgdclgyg3nzh; \
                            SameSite=Lax; SameSite=Lax; SameSite=Lax',
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)\
                             AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
            'Token': mock_token,
            'Member-Id': mock_member_id,
            'User-Id': mock_user_id
        }

    def __iter__(self):
        return iter(self.headers.items())

