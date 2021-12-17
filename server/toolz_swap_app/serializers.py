from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = [
            'password',
            'last_login',
            'is_staff',
            'is_superuser',
            'is_active',
            'date_joined',
            'groups',
            'user_permissions'
        ]


class ToolTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolType
        fields = ('tool_id', 'name', 'purpose', 'popularity')


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('title', 'owner', 'brand')


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


class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage

        # even though the json response won't return the actual file, we want option to upload images
        fields = ("__all__")


class ListingRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingRequest
        fields = "__all__"


class ListingReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingReview
        fields = "__all__"

