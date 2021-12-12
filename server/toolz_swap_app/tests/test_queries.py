from typing import List
from django.db.models import Count, F, Value
from django.test import TestCase
import datetime

from toolz_swap_app.models import City, Neighborhood, ToolType, Brand, ToolModel, User, Listing, ListingRequest, ListingReview, ListingImage
from toolz_swap_app.queries import *
# datetime.date(2021, 12, 30)
# python manage.py test toolz_swap_app.tests.test_queries

# TODO: we changed our models so we need new tests!
# IDEA: add reviews for lenders too? not just the listings


class TestQueries(TestCase):
    def setUp(self):
        # City
        los_angeles = City.objects.create(name="Los Angeles", population=35000000, size_sqkm=157.42)

        # Neighborhood
        glendale = Neighborhood.objects.create(name="Glendale", city=los_angeles, population=1200000, size_sqkm=15.4)

        # ToolType
        drill_type_1 = ToolType.objects.create(name='Drill', purpose='Drilling', popularity='High')
        saw_type_1 = ToolType.objects.create(name='Saw', purpose='Sawing', popularity='Medium')

        # Brand
        bosch_brand_1 = Brand.objects.create(name='Bosch')
        cat_brand_1 = Brand.objects.create(name='CAT')

        # ToolModel
        scp51 = ToolModel.objects.create(name='SCP51', year_released=2002)
        pgh461 = ToolModel.objects.create(name='PGH461', year_released=2016)

        # User
        user_1 = User.objects.create(username="test_user_1", first_name="Mike", last_name="Tyson", email="mike@toolz.com", password='test_password_1324')
        user_2 = User.objects.create(username="test_user_2", first_name="Kate", last_name="McLaren", email="kate@toolz.com", password='test_password_2435')
        user_3 = User.objects.create(username="test_user_3", first_name="Coco", last_name="Chanel", email="coco@toolz.com", password='test_password_5342')

        # Listing
        listing1 = Listing.objects.create(title="Drill",
                                          owner=user_1,
                                          brand=bosch_brand_1,
                                          model=scp51,
                                          tool_category=drill_type_1,
                                          address='Random Address',
                                          city=los_angeles,
                                          neighborhood=glendale,
                                          description='Lending Used drill',
                                          rating_average = 3.2)

        listing2 = Listing.objects.create(title="Saw",
                                          owner=user_2,
                                          brand=cat_brand_1,
                                          model=pgh461,
                                          tool_category=saw_type_1,
                                          address='Random Address in LA',
                                          city=los_angeles,
                                          neighborhood=glendale,
                                          description='cool Saw yeee',
                                          rating_average = 4.6)

        # ListingRequest
        request_1 = ListingRequest.objects.create(listing=listing1,
                                                  created_on=datetime.date(2021, 12, 30),
                                                  author=user_1,
                                                  recipient=user_3,
                                                  body='Can I use it for a day please?',
                                                  renting_start=datetime.date(2021, 12, 13),
                                                  renting_end=datetime.date(2021, 12, 14),
                                                  approved=False)

        review_1 = ListingReview.objects.create(listing=listing2,
                                                created_on=datetime.date(2020, 9, 5),
                                                author=user_2,
                                                body='Great Saw, easy to set up and use!',
                                                top_review=True,
                                                rating=4,
                                                review_likes=2,
                                                review_dislikes=0)

    def test_get_user_by_username(self):
        '''
        get_user_by_username() query finds the expected user by their username
        '''
        user_1 = User.objects.all()[0]
        user_1_username = user_1.username
        self.assertTrue(get_user_by_username(user_1_username), user_1)