from django.urls import path

from . import views

urlpatterns = [
    # path('', include(router.urls)),
    path('api/users', views.users_view),
    path('auth/login', views.login),
    path('auth/logout', views.logout)
]
