from rest_framework import viewsets, permissions

from .models import *
from .serializers import *


class ToolTypeViewSet(viewsets.ModelViewSet):
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
    queryset = Brand.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BrandSerializer


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ListingSerializer
