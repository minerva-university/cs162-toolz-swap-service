from rest_framework import viewsets, permissions

from .models import ToolType
from .serializers import ToolSerializer


class ToolViewSet(viewsets.ModelViewSet):
    queryset = ToolType.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ToolSerializer
