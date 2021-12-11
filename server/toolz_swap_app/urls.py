from django.urls import path

from . import views

urlpatterns = [
    # path('', include(router.urls)),
    path('api/user', views.users_view),
    path('auth/login', views.login),
    path('auth/logout', views.logout),
    path('api/listing/', views.get_all_listings_view),
    path('api/city/', views.get_all_cities_view),
    path('api/neighborhood/', views.get_all_neighborhoods_view)
]
