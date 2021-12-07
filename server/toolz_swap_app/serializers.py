from rest_framework import serializers
from .models import Tool

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = ('tool_id', 'toolName', 'toolBrand', 'toolModel', 'toolCondition', 'description')