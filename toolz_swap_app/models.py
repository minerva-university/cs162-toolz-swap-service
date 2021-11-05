from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Tool(models.Model):
    toolName = models.CharField(max_length=200)
    toolModel = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.toolName

class Swaps(models.Model):
    borrowerId =  models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    lenderId =  models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    toolId =  models.ForeignKey(
        Tool, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

class Listing(models.Model):
    lenderId =  models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    toolId =  models.ForeignKey(
        Tool, on_delete=models.CASCADE, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()
