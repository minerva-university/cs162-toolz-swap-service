from django.urls import path
from . import views
from rest_framework import routers
from toolz_swap_app.api import ToolViewSet

router = routers.DefaultRouter()
router.register('api/tool', ToolViewSet, 'tool')

urlpatterns = router.urls