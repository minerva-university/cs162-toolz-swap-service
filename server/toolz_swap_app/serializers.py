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
    brand_name = serializers.ReadOnlyField(source='brand.name')
    model_name = serializers.ReadOnlyField(source='model.name')
    owner_name = serializers.ReadOnlyField(source='owner.username')
    city_name = serializers.ReadOnlyField(source='city.name')
    neighborhood_name = serializers.ReadOnlyField(source='neighborhood.name')
    category_name = serializers.ReadOnlyField(source='tool_category.name')
    
    class Meta:
        model = Listing
        fields = ('__all__')


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
    author_username = serializers.ReadOnlyField(source='author.username')
    recipient_username = serializers.ReadOnlyField(source='recipient.username')
    listing_title = serializers.ReadOnlyField(source='listing.title')
    class Meta:
        model = ListingRequest
        fields = "__all__"


class ListingReviewSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    listing_title = serializers.ReadOnlyField(source='listing.title')
    class Meta:
        model = ListingReview
        fields = "__all__"

class UserDetailSerializer(serializers.ModelSerializer):
    saved_listing_title = ListingSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ("__all__")
