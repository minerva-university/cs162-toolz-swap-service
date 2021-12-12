from typing import List
from django.db.models import Count, F, Value
from django.test import TestCase
import datetime
import toolz_swap_app.queries as q
from toolz_swap_app.models import User, City, Neighborhood, ToolType, Brand, ToolModel, Listing, ListingRequest, ListingReview, ListingImage

# TODO: we changed our models so we need new tests!
class TestDatabase(TestCase):
    def setUp(self):
        pass
    def test_get_user_by_id(self):
        pass