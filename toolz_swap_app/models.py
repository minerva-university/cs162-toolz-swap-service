from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

class User(AbstractUser):
    pass

class Tool(models.Model):
    tool_id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for this particular tool')
    toolName = models.CharField(max_length=200)
    toolModel = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    available = models.BooleanField(default=True)

    class Meta:
        ordering = ['toolName']

    def __str__(self):
        return self.toolName

class Listing(models.Model):
    listing_id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for this particular listing')
    lenderId =  models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    toolId =  models.ForeignKey(
        Tool, on_delete=models.CASCADE, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()


class Swaps(models.Model):
    swaps_id = models.UUIDField(primary_key=True, default=uuid.uuid4, help_text='Unique ID for this particular swap')
    borrowerId =  models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    toolId =  models.ForeignKey(
        Tool, on_delete=models.CASCADE, null=True, blank=True)
    listingId = models.ForeignKey(
        Listing, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()

