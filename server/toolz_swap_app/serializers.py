from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')


class ToolTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolType
        fields = ('tool_id', 'name', 'purpose', 'popularity')


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'owner', 'brand', 'item_image_url')


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"


class NeighborhoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Neighborhood
        fields = "__all__"


class ToolModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolModel
        fields = "__all__"


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ("brand_id", "name", "item_image_url")


