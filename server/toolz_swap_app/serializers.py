from rest_framework import serializers
from .models import ToolType, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')


class ToolTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolType
        fields = ('tool_id', 'toolName', 'toolBrand', 'toolModel', 'toolCondition')