from django.urls import path
import re

from . import views
from . import api

from rest_framework import routers
from toolz_swap_app.api import *

# connect the ViewSets into "standarized" structure of URLs in Django
router = routers.DefaultRouter()
router.register('tool_type', ToolTypeViewSet, 'tooltype')
router.register('tool_model', ToolModelViewSet, 'toolmodel')
router.register('tool_brand', BrandViewSet, 'toolbrand')
router.register('listing', ListingViewSet, 'listing')
router.register('cities', CityViewSet, 'city')
router.register('neighborhoods', NeighborhoodViewSet, 'neighborhood')
router.register('listing_request', RequestViewSet, 'listing request')
router.register('listing_review', ReviewViewSet, 'listing review')
router.register('listing_image', ListingImageViewSet, 'listing review')
urlpatterns = router.urls