from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    username = models.CharField(max_length=40, unique=True)
    USERNAME_FIELD = 'username'

class Tool(models.Model):
    toolId = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, help_text='Unique ID for this particular tool')
    toolName = models.CharField(max_length=200)
    toolBrand = models.CharField(max_length=200, null=True, blank=True)
    toolModel = models.CharField(max_length=200, null=True, blank=True)
    toolCondition = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return "<ID: {} - Name:{} - Brand:{} - Model:{}>".format(self.toolId, self.toolName, self.toolBrand, self.toolModel)

class Listing(models.Model):
    #listing_id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, help_text='Unique ID for this particular listing')
    lenderId =  models.ForeignKey(
        User, on_delete=models.RESTRICT, null=True)
    toolId =  models.ForeignKey(
        Tool, on_delete=models.SET_NULL, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()

    def __str__(self):
        return f"<lenderId:{self.lenderId} - toolId:{self.toolId}"


class Swaps(models.Model):
    #swaps_id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, help_text='Unique ID for this particular swap')
    borrowerId =  models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    listingId = models.ForeignKey(
        Listing, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()

    def __str__(self):
        return "<borrowerId: {} - listingId: {}>".format(self.borrowerId, self.listingId)
