from django.urls import path
from . import views
from rest_framework import routers
from .api import ToolViewSet

router = routers.DefaultRouter()
router.register('tool/', ToolViewSet, 'tool')

urlpatterns = router.urls
