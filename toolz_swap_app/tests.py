from django.test import TestCase
from .models import User, Tool, Listing, Swaps

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

# TODO: Test Listings
# TODO: Test Swaps
# TODO: Test users
# TODO: Test interactions and foreign keys