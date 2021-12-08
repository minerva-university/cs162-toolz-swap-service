from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# TODO: Figure out ManyToMany field in User (see comment near saved_places)
# TODO: Go through the comments and make other suggested changes, such as Phone number in User
# TODO: make nitty-gritty changes like null=True, blank=True, max_length=number, on_delete=SET_NULL/CASCADE/RESTRICT and others
# TODO: added choices of 1 to 5 for Rating in ListinsReviews
# TODO: add representation strings __str__ for the tables
# TODO: add Admin views in admin.py

'''
OLD MODELS. SAVED TEMPORARILY FOR IMMEDIATE REFERENCE

class Tool(models.Model):
    toolId = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, help_text='Unique ID for this particular tool')
    toolName = models.CharField(max_length=200)
    toolBrand = models.CharField(max_length=200, null=True, blank=True)
    toolModel = models.CharField(max_length=200, null=True, blank=True)
    toolCondition = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return "<ID: {} - Name:{} - Brand:{} - Model:{}>".format(self.toolId, self.toolName, self.toolBrand, self.toolModel)

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

'''
class Cities(models.Model):
    city_id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    name=models.CharField()
    population=models.IntegerField()
    size_sqkm=models.FloatField()

class Neighborhoods(models.Model):
    neighborhood_id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    name=models.CharField()
    city=models.ForeignKey(Cities, on_delete=models.CASCADE)
    population=models.IntegerField()
    size_sqkm=models.FloatField()

class ToolTypes(models.Model):
    tool_id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    name=models.CharField()
    purpose=models.TextField()
    popularity=models.CharField()

class Brands(models.Model):
    brand_id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    name=models.CharField()
    logo=models.ImageField()

class ToolModels(models.Model):
    model_id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    name=models.CharField()
    year_released=models.IntegerField()
    
class User(AbstractUser):
    user_id = models.UUIDField(default=uuid.uuid4) 
    username = models.CharField(max_length=40, unique=True, primary_key=True)
    USERNAME_FIELD = 'username'

    #first_name=models.CharField() 
    # first_name, last_name, password, and email are default fields in Django User model.

    phone=models.CharField() # I left it as CharField for now but def. needs to be changed
    address=models.CharField()
    city=models.ForeignKey(Cities, on_delete=models.CASCADE)

    # There is a problem that we need to define Listings be User to be able to define the below
    # However, we also need to define User before Listing. I am sure there is a workaround though
    #saved_places=models.ManyToManyField(Listings)
    #rented_tools=models.ManyToManyField(Listings)
    profile_photo=models.ImageField()
    bio=models.CharField()
    created_on=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"<username:{self.username}, \
                first_name:{self.first_name},\
                last_name:{self.last_name}, \
                email:{self.email};"

class Listings(models.Model):
    # default=uuid.uuid4
    listing_id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True, help_text='Unique ID for this particular listing')
    title = models.CharField(max_length=200)
    owner =  models.ForeignKey(
        User, on_delete=models.RESTRICT, null=True)
    brand = models.ForeignKey(Brands, on_delete=models.CASCADE)
    model = models.ForeignKey(ToolModels, on_delete=models.CASCADE)
    tool_category=models.ForeignKey(ToolTypes, on_delete=models.CASCADE)
    address=models.CharField()
    city=models.ForeignKey(Cities, on_delete=models.CASCADE)
    neighborhood=models.ForeignKey(Neighborhoods, on_delete=models.CASCADE)
    description=models.TextField(max_length=2000)
    created_on=models.DateTimeField(auto_now_add=True)
    rating_average = models.FloatField() # average rating of the listing, can be calculated from ListingReviews
    
    #likes=models.IntegerField()
    #dislikes=models.IntegerField()

    def __str__(self):
        return f"<listing_id:{self.listing_id}, title:{self.title};"

class ListingRequest(models.Model):
    request_id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing=models.ForeignKey(Listings, on_delete=models.CASCADE)
    created_on=models.DateTimeField()
    author=models.ForeignKey(User, on_delete=models.CASCADE)
    recipient=models.ForeignKey(User, on_delete=models.CASCADE)
    body=models.TextField()
    renting_start = models.DateTimeField(auto_now_add=True)
    renting_end = models.DateTimeField()
    approved = models.BooleanField()

class ListingReviews(models.Model):
    review_id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing=models.ForeignKey(Listings, on_delete=models.CASCADE)
    created_on=models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(User, on_delete=models.CASCADE)
    body=models.TextField()
    top_review=models.BooleanField()
    # this is the rating that a borrower can give to the Listing
    rating = models.IntegerField() # maybe add allowed integers later;

    # these are likes/dislikes for the review, such as if it was helpful
    review_likes=models.IntegerField()
    review_dislikes=models.IntegerField()

class ListingImages(models.Model):
    image_id=models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing=models.ForeignKey(Listings, on_delete=models.CASCADE)
    created_on=models.DateTimeField(auto_now_add=True)
    author=models.ForeignKey(User, on_delete=models.CASCADE)
    image=models.ImageField()
    top_image=models.BooleanField()

