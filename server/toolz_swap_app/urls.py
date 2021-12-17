from django.urls import path

from . import views
from . import api
urlpatterns = [
    path('api/user/', views.users_view),
    path('auth/login/', views.login),
    path('auth/logout/', views.logout),
    #path('api/listing/', views.listing_view),
    #path('api/city/', views.get_all_cities_view),
    #path('api/neighborhood/', views.get_all_neighborhoods_view),
    path('api/listing_images/', views.get_all_listing_images)
    
]
