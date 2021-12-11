from rest_framework import viewsets, permissions

from .models import ToolType
from .serializers import ToolTypeSerializer


class ToolTypeViewSet(viewsets.ModelViewSet):
    queryset = ToolType.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ToolTypeSerializer
