from rest_framework import viewsets, permissions, generics, filters
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import *
from .serializers import *
from .queries import *

# Viewsets here are general basic model viewsets. Include GET, POST, PUT, DELETE, OPTIONS
# all viewsets here are routed in routerurls.py

class ToolTypeViewSet(viewsets.ModelViewSet):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object
    """
    queryset = ToolType.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ToolTypeSerializer


class ToolModelViewSet(viewsets.ModelViewSet):
    queryset = ToolModel.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ToolModelSerializer


class BrandViewSet(viewsets.ModelViewSet):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object
    """
    queryset = Brand.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BrandSerializer


class ListingViewSet(viewsets.ModelViewSet):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object
    """
    queryset = Listing.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingSerializer


class CityViewSet(viewsets.ModelViewSet):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object
    """
    queryset = City.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CitySerializer


class NeighborhoodViewSet(viewsets.ModelViewSet):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object
    """
    queryset = Neighborhood.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = NeighborhoodSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object
    """
    queryset = ListingReview.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingReviewSerializer


class RequestViewSet(viewsets.ModelViewSet):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object
    """
    queryset = ListingRequest.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingRequestSerializer


class ListingImageViewSet(viewsets.ModelViewSet):
    queryset = ListingImage.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingImageSerializer


class UserDetailViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserDetailSerializer
