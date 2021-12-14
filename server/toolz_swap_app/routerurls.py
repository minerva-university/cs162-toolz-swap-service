from django.urls import path

from . import views
from . import api

from rest_framework import routers
from toolz_swap_app.api import *
router = routers.DefaultRouter()
router.register('tool/type', ToolTypeViewSet, 'tooltype')
router.register('tool/model', ToolModelViewSet, 'toolmodel')
router.register('tool/brand', BrandViewSet, 'toolbrand')
router.register('listing', ListingViewSet, 'listing')
urlpatterns = router.urls