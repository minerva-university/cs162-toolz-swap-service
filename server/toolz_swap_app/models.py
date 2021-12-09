from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
import uuid


class User(AbstractUser):
    """
    #phone = PhoneNumberField(unique=True, default='')
    address = models.CharField(max_length=300, default='')
    city = models.CharField(max_length=400, default='')
    state = models.CharField(max_length=5, default='')
    zipcode = models.IntegerField(null=True, default=0)
    """
    pass


class Tool(models.Model):
    tool_id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True,
                               help_text='Unique ID for this particular tool')
    toolName = models.CharField(max_length=200)
    toolBrand = models.CharField(max_length=200, null=True, blank=True)
    toolModel = models.CharField(max_length=200, null=True, blank=True)
    toolCondition = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['toolName']

    def __str__(self):
        return self.toolName


class Listing(models.Model):
    listing_id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4,
                                  help_text='Unique ID for this particular listing')
    lenderId = models.ForeignKey(
        User, on_delete=models.RESTRICT, null=True)
    toolId = models.ForeignKey(
        Tool, on_delete=models.SET_NULL, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()


class Swaps(models.Model):
    swaps_id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4,
                                help_text='Unique ID for this particular swap')
    borrowerId = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    listingId = models.ForeignKey(
        Listing, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()
