"""toolz_swap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.urls import include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from toolz_swap_app import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # if we are on the toolz-swap/ path, it loads urls for the toolz_swap_app
    path('toolz-swap/', include('toolz_swap_app.urls')),

    # enables authentication URLs provided by Django such as login and logout
    path('accounts/', include('django.contrib.auth.urls')),

    path('', include('toolz_swap_app.urls')),

    path('router/', include('toolz_swap_app.routerurls')),
    # enables serving static pages in development
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
