from rest_framework import serializers
from .models import ToolTypes

# the Tool model has been removed, so I am replacing it with another Model:
class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolTypes
        fields = ('tool_id', 'name', 'purpose', 'popularity')