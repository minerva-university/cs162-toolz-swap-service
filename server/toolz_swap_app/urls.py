from django.urls import path
from . import views
from rest_framework import routers
from .api import ToolViewSet
from django.urls import include

# router = routers.DefaultRouter()
# router.register('tool/', ToolViewSet, 'tool')

urlpatterns = [
    # path('', include(router.urls)),
    path('api/users', views.users_view),
    path('auth/login', views.login),
    path('auth/logout', views.logout)
]
