from typing import List
from django.test import TestCase
from .models import User, Tool, Listing, Swaps
import datetime

class ToolsTestCase(TestCase):
    def setUp(self):
        Tool.objects.create(toolName="Drill", toolBrand="Bosch", toolModel="SC151", description="The best drill")
        Tool.objects.create(toolName="Drill", toolBrand="Homeworks", toolModel="KP244", description="Another drill")
        Tool.objects.create(toolName="Screwdriver", toolBrand="Bosch", toolModel="SD100", description="A screwdriver")

    def test_query_first_tool(self):
        """Queries the first tool correctly"""

        drill = Tool.objects.filter(toolName="Drill")[0]
        self.assertEqual('Drill', drill.toolName)
        self.assertEqual('Bosch', drill.toolBrand)
        self.assertEqual('SC151', drill.toolModel)

    def test_query_screwdriver(self):
        '''Filters the screwdriver from the rest of the tools'''

        driver = Tool.objects.filter(toolName="Screwdriver")[0]
        self.assertEqual('Screwdriver', driver.toolName)

class TestInteractions(TestCase):
    def setUp(self):
        # Tools
        drill_1 = Tool.objects.create(toolName="Drill", toolBrand="Bosch", toolModel="SC151", description="The best drill")
        drill_2 = Tool.objects.create(toolName="Drill", toolBrand="Homeworks", toolModel="KP244", description="Another drill")
        screwdriver_1 = Tool.objects.create(toolName="Screwdriver", toolBrand="Bosch", toolModel="SD100", description="A screwdriver")

        # Users
        test_user_1 = User.objects.create(username="test_user_1", first_name="Mike", last_name="Tyson", email="mike@toolz.com", password='test_password_1324')
        test_user_2 = User.objects.create(username="test_user_2", first_name="Kate", last_name="McLaren", email="kate@toolz.com", password='test_password_2435')

        # Listings
        listing_1 = Listing.objects.create(lenderId=test_user_1, toolId=drill_1, created=datetime.date(2021, 11, 29), expires=datetime.date(2021, 12, 30))
        listing_2 = Listing.objects.create(lenderId=test_user_1, toolId=drill_2, created=datetime.date(2021, 8, 29), expires=datetime.date(2021, 9, 30))
        listing_3 = Listing.objects.create(lenderId=test_user_2, toolId=screwdriver_1, created=datetime.date(2021, 3, 13), expires=datetime.date(2022, 5, 17))

        # Swaps
        swap_1 = Swaps.objects.create(borrowerId = test_user_2, listingId=listing_1, expires=datetime.date(2021, 12, 1))
        swap_2 = Swaps.objects.create(borrowerId = test_user_1, listingId=listing_3, expires=datetime.date(2022, 1, 1))

    def test_check_queries(self):
        users = User.objects.all()
        listings = Listing.objects.all()
        swaps = Swaps.objects.all()

        print(users)
        print(listings)
        print(swaps)

        self.assertTrue(True)

    def test_find_users_from_swap(self):
        '''
        Queries the borrower and the lender when given a swap ID

        E.g., for swap_1, it should return borrower=test_user_2 and lender=test_user_1
        
        '''
        swap_1 = Swaps.objects.all()[0]
        queried_listing = Listing.objects.filter(id=swap_1.id)
        print(queried_listing.lenderId)

        self.assertTrue(True)

# TODO: Test Listings
# TODO: Test Swaps
# TODO: Test users
# TODO: Test interactions and foreign keys
# TODO: ADD SOME LOGIC (transactions)