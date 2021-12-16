from typing import List
from django.db.models import Count, F, Value
from django.test import TestCase
import datetime

from toolz_swap_app.models import City, Neighborhood, ToolType, Brand, ToolModel, User, Listing, ListingRequest, ListingReview, ListingImage
from toolz_swap_app.queries import *

los_angeles = City.objects.create(name="Los Angeles", population=35000000, size_sqkm=157.42)
san_francisco = City.objects.create(name="San Francisco", population=900000, size_sqkm=28.12)

        # Neighborhood
glendale = Neighborhood.objects.create(name="Glendale", city=los_angeles, population=1200000, size_sqkm=15.4)
venice = Neighborhood.objects.create(name="Venice", city=los_angeles, population=80000, size_sqkm=8.4)
tenderloin = Neighborhood.objects.create(name="Tenderloin", city=san_francisco, population=64000, size_sqkm=9.6)
chinatown = Neighborhood.objects.create(name="Chinatown", city=san_francisco, population=300000, size_sqkm=5.4)

        # ToolType
drill_type_1 = ToolType.objects.create(name='Drill', purpose='Drilling', popularity='High')
wrench_keys_type_1 = ToolType.objects.create(name='Wrench Keys', purpose='Wrenching', popularity='High')
saw_type_1 = ToolType.objects.create(name='Saw', purpose='Sawing', popularity='Medium')

        # Brand
bosch_brand_1 = Brand.objects.create(name='Bosch', item_image_url="https://i.ibb.co/SBkf5Fs/bosch-vector.jpg")
cat_brand_1 = Brand.objects.create(name='CAT', item_image_url="https://i.ibb.co/xXQRVGN/cat.png")
makita_brand_1 = Brand.objects.create(name='Makita', item_image_url="https://i.ibb.co/RHBhjyg/makita.jpg")

        # ToolModel
scp51 = ToolModel.objects.create(name='SCP51', year_released=2002)
pgh461 = ToolModel.objects.create(name='PGH461', year_released=2016)
drl41 = ToolModel.objects.create(name='DRL41', year_released=2011)

# User
user_1 = User.objects.create(username="test_user_1", first_name="Mike", last_name="Tyson", email="mike@toolz.com", password='test_password_1324')
user_2 = User.objects.create(username="test_user_2", first_name="Kate", last_name="McLaren", email="kate@toolz.com", password='test_password_2435')
user_3 = User.objects.create(username="test_user_3", first_name="Coco", last_name="Chanel", email="coco@toolz.com", password='test_password_5342')
user_4 = User.objects.create(username="test_user_4", first_name="Jake", last_name="Brown", email="jake@toolz.com", password='test_password_451')
user_5 = User.objects.create(username="test_user_5", first_name="Caitlyn", last_name="McDonald", email="caitlyn@toolz.com", password='test_password_542')
user_6 = User.objects.create(username="test_user_6", first_name="Vi", last_name="Robinson", email="vi@toolz.com", password='test_password_907')

# Listing
listing1 = Listing.objects.create(title="Drill",
                                        owner=user_1,
                                        brand=bosch_brand_1,
                                        model=scp51,
                                        tool_category=drill_type_1,
                                        price=20.0,
                                        address='451 Glandale St.',
                                        city=los_angeles,
                                        neighborhood=glendale,
                                        description='Lending Used drill',
                                        rating_average = 3.2)

listing2 = Listing.objects.create(title="Saw",
                                        owner=user_2,
                                        brand=cat_brand_1,
                                        model=pgh461,
                                        tool_category=saw_type_1,
                                        price=10.0,
                                        address='894 Longroad St.',
                                        city=los_angeles,
                                        neighborhood=venice,
                                        description='cool Saw yeee',
                                        rating_average = 4.6)

listing3 = Listing.objects.create(title="Wrench Keys Set",
                                        owner=user_5,
                                        brand=makita_brand_1,
                                        model=drl41,
                                        tool_category=wrench_keys_type_1,
                                        price=12.0,
                                        address='16 Turk St.',
                                        city=san_francisco,
                                        neighborhood=tenderloin,
                                        description='Lending a new set of wrench keys',
                                        rating_average = 1.8)

listing4 = Listing.objects.create(title="Wrench Keys (used)",
                                        owner=user_1,
                                        brand=makita_brand_1,
                                        model=pgh461,
                                        tool_category=wrench_keys_type_1,
                                        price=23.0,
                                        address='451 Glandale St.',
                                        city=los_angeles,
                                        neighborhood=glendale,
                                        description='A set of 10 used wrench keys',
                                        rating_average = 3.3)

listing5 = Listing.objects.create(title="Saw",
                                        owner=user_6,
                                        brand=cat_brand_1,
                                        model=drl41,
                                        tool_category=saw_type_1,
                                        price=14.0,
                                        address='451 Glandale St.',
                                        city=san_francisco,
                                        neighborhood=chinatown,
                                        description='Please rent my saw',
                                        rating_average = 4.7)

listing6 = Listing.objects.create(title="Saw Makita New",
                                        owner=user_2,
                                        brand=makita_brand_1,
                                        model=pgh461,
                                        tool_category=saw_type_1,
                                        price=44.0,
                                        address='894 Longroad St.',
                                        city=los_angeles,
                                        neighborhood=venice,
                                        description='A new makita saw',
                                        rating_average = 4.9)

listing7 = Listing.objects.create(title="Drill Bosch",
                                        owner=user_5,
                                        brand=bosch_brand_1,
                                        model=drl41,
                                        tool_category=saw_type_1,
                                        price=9.0,
                                        address='16 Turk St.',
                                        city=san_francisco,
                                        neighborhood=tenderloin,
                                        description='Lending a new Bosch Saw',
                                        rating_average = 4.9)

listing8 = Listing.objects.create(title="Saw (used)",
                                        owner=user_1,
                                        brand=makita_brand_1,
                                        model=pgh461,
                                        tool_category=saw_type_1,
                                        price=30.0,
                                        address='451 Glandale St.',
                                        city=los_angeles,
                                        neighborhood=glendale,
                                        description='A set of 10 used wrench keys',
                                        rating_average = 3.3)
# ListingRequest
request_1 = ListingRequest.objects.create(listing=listing1,
                                                created_on=datetime.date(2021, 11, 30),
                                                author=user_1,
                                                recipient=user_3,
                                                body='Can I use it for a day please?',
                                                renting_start=datetime.date(2021, 12, 13),
                                                renting_end=datetime.date(2021, 12, 14),
                                                approved=False)

request_2 = ListingRequest.objects.create(listing=listing2,
                                                created_on=datetime.date(2021, 11, 28),
                                                author=user_2,
                                                recipient=user_4,
                                                body='I would like to use it. Can pick up asap.',
                                                renting_start=datetime.date(2021, 11, 28),
                                                renting_end=datetime.date(2021, 12, 10),
                                                approved=False)

request_3 = ListingRequest.objects.create(listing=listing7,
                                                created_on=datetime.date(2021, 12, 16),
                                                author=user_5,
                                                recipient=user_3,
                                                body='Please lend it to me. Thanks!',
                                                renting_start=datetime.date(2021, 12, 18),
                                                renting_end=datetime.date(2021, 12, 21),
                                                approved=True)

# ListingReviews
review_1 = ListingReview.objects.create(listing=listing2,
                                        created_on=datetime.date(2020, 9, 5),
                                        author=user_2,
                                        body='Great Saw, easy to set up and use!',
                                        top_review=True,
                                        rating=4,
                                        review_likes=2,
                                        review_dislikes=0)

review_2 = ListingReview.objects.create(listing=listing5,
                                        created_on=datetime.date(2020, 9, 6),
                                        author=user_4,
                                        body='Great Saw!',
                                        top_review=False,
                                        rating=5,
                                        review_likes=4,
                                        review_dislikes=1)

review_3 = ListingReview.objects.create(listing=listing5,
                                        created_on=datetime.date(2020, 9, 6),
                                        author=user_3,
                                        body='A pretty rusty saw, did not like it!',
                                        top_review=False,
                                        rating=2,
                                        review_likes=1,
                                        review_dislikes=5)                                        

# images
image1 = ListingImage.objects.create(listing=listing1, author=user_1, item_image_url="https://i.ibb.co/jhB2d8D/drill2.jpg")
image2 = ListingImage.objects.create(listing=listing1, author=user_1, item_image_url="https://i.ibb.co/chkPV3p/drill.jpg")
image3 = ListingImage.objects.create(listing=listing2, author=user_2, item_image_url="https://i.ibb.co/kQQy2s6/saw.jpg")
image3 = ListingImage.objects.create(listing=listing3, author=user_5, item_image_url="https://i.ibb.co/YhXY0K9/image.png")
image4 = ListingImage.objects.create(listing=listing4, author=user_1, item_image_url="https://i.ibb.co/SJBHK1L/image.png")
image5 = ListingImage.objects.create(listing=listing5, author=user_6, item_image_url="https://i.ibb.co/K5mJSjN/image.png")
image6 = ListingImage.objects.create(listing=listing6, author=user_2, item_image_url="https://i.ibb.co/C5r56V7/image.png")
image7 = ListingImage.objects.create(listing=listing7, author=user_5, item_image_url="https://i.ibb.co/6m9V9R4/image.png")
image8 = ListingImage.objects.create(listing=listing8, author=user_1, item_image_url="https://i.ibb.co/9cc6pyk/image.png")