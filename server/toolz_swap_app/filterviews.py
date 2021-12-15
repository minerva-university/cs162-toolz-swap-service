from rest_framework import viewsets, permissions, generics, filters
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import *
from .serializers import *
from .queries import *

class ListingForNeighborhoodViewSet(generics.ListAPIView):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object (incl. CRUD)
    """
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingSerializer

    def get_queryset(self):
        neighborhood_id = self.request.query_params.get('neighborhood_id', None)
        return get_all_listings_for_neighborhood(neighborhood_id)


class ListingForCityViewSet(generics.ListAPIView):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object (incl. CRUD)
    """
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingSerializer

    def get_queryset(self):
        city_id = self.request.query_params.get('city_id', None)
        return get_all_listings_for_city(city_id)


class ListingReviewViewSet(generics.ListAPIView):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object (incl. CRUD)
    """
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingReviewSerializer
    def get_queryset(self):
        listing_id = self.request.query_params.get('listing_id', None)
        return get_reviews_for_listing(listing_id)


class ListingRequestViewSet(generics.ListAPIView):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object (incl. CRUD)
    """
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingRequestSerializer
    def get_queryset(self):
        listing_id = self.request.query_params.get('listing_id', None)
        return get_requests_for_listing(listing_id)


class ListingByUserViewSet(generics.ListAPIView):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object (incl. CRUD)
    """
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingSerializer
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        return get_all_tools_listed_by_owner(user_id)


class RequestMadeByUserViewSet(generics.ListAPIView):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object (incl. CRUD)
    """
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingRequestSerializer
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        return get_requests_by_user(user_id)


class RequestMadeToUserViewSet(generics.ListAPIView):
    """
    Allows not to have separate views for getting 
    a list of objects and detail of one object (incl. CRUD)
    """
    
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingRequestSerializer
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        return get_requests_to_user(user_id)