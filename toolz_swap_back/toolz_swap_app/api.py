from toolz_swap_app.models import ToolTypes
from rest_framework import viewsets, permissions
from toolz_swap_app.serializers import ToolSerializer

class ToolViewSet(viewsets.ModelViewSet):
    queryset = ToolTypes.objects.all()
    permission_classes=[
        permissions.AllowAny
    ]
    serializer_class = ToolSerializer