from django.urls import path
from . import views

urlpatterns = [
    # when the user is on the '/' path, it calles the index function from views.py
    path('', views.index, name='index'),
]