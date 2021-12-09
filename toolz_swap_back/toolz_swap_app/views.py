from django.shortcuts import render
from .models import User, Listings, ToolTypes

from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.core import serializers
from django.conf import settings
from rest_framework import viewsets
from .serializers import ToolSerializer
import json

# Create your views here.

class ToolView(viewsets.ModelViewSet):
    serializer_class = ToolSerializer
    queryset = ToolTypes.objects.all()