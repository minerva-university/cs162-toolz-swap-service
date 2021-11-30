from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    We are using django's abstract user here, which takes care of a basic user table. 
    """
    pass

class Tool(models.Model):
    """
    Tool stores information on individual tools including the name of the tool, the model, 
    a description and a boolean value of whether it is available or not.
    
    """
    toolName = models.CharField(max_length=200)
    toolModel = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.toolName


class Listing(models.Model):
    """
    Listing includes the ID of the tool (foreign key -> Tool) that is being listed, along with the lender's ID (foreign key -> User) 
    and information on listing creation-exiration dates.
    
    """
    lenderId =  models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    toolId =  models.ForeignKey(
        Tool, on_delete=models.CASCADE, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()


class Swaps(models.Model):
    """
    Swaps stores information on swaps that have taken place successfully.
    It contains information on the borrower and lender (2 foreign keys -> User) as well as information on the tool (foreign key -> Tool)
    and the listing (foreign key -> Listing). 
    
    There is also an expiration date, specifying when the tool needs to be returned 
    (different from expires in listing which indicates the expiration date of the listing).

    """

    borrowerId =  models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True)
    toolId =  models.ForeignKey(
        Tool, on_delete=models.CASCADE, null=True, blank=True)
    listingId = models.ForeignKey(
        Listing, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()

