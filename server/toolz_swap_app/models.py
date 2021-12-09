import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


# TODO: Go through the comments and make other suggested changes, such as Phone number in User TODO: make
#  nitty-gritty changes like null=True, blank=True, max_length=number, on_delete=SET_NULL/CASCADE/RESTRICT and others
#  TODO: added choices of 1 to 5 for Rating in ListinsReviews TODO: add representation strings __str__ for the tables
#   TODO: add Admin views in admin.py

class City(models.Model):
    city_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    population = models.IntegerField()
    size_sqkm = models.FloatField()


class Neighborhood(models.Model):
    neighborhood_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    population = models.IntegerField()
    size_sqkm = models.FloatField()


class ToolType(models.Model):
    tool_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    purpose = models.TextField()
    popularity = models.CharField(max_length=200)


class Brand(models.Model):
    brand_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    logo = models.ImageField()


class ToolModel(models.Model):
    model_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    year_released = models.IntegerField()


class User(AbstractUser):
    phone = models.CharField(max_length=200, blank=True)  # I left it as CharField for now but def. needs to be changed
    address = models.CharField(max_length=200, blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    saved_places = models.ManyToManyField('Listing', related_name='saved_places')
    rented_tools = models.ManyToManyField('Listing', related_name='rented_tools')
    profile_photo = models.ImageField(null=True, blank=True)
    bio = models.CharField(max_length=200, blank=True)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return f"<username:{self.username}, \
                first_name:{self.first_name},\
                last_name:{self.last_name}, \
                email:{self.email};"


class Listing(models.Model):
    listing_id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True,
                                  help_text='Unique ID for this particular listing')
    title = models.CharField(max_length=200)
    owner = models.ForeignKey(
        User, on_delete=models.RESTRICT, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    model = models.ForeignKey(ToolModel, on_delete=models.CASCADE)
    tool_category = models.ForeignKey(ToolType, on_delete=models.CASCADE)
    address = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.CASCADE)
    description = models.TextField(max_length=2000)
    created_on = models.DateTimeField(auto_now_add=True)
    rating_average = models.FloatField()  # average rating of the listing, can be calculated from ListingReviews

    # likes=models.IntegerField()
    # dislikes=models.IntegerField()

    def __str__(self):
        return f"<listing_id:{self.listing_id}, title:{self.title};"


class ListingRequest(models.Model):
    request_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    created_on = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipient')
    body = models.TextField()
    renting_start = models.DateTimeField(auto_now_add=True)
    renting_end = models.DateTimeField()
    approved = models.BooleanField()


class ListingReview(models.Model):
    review_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    top_review = models.BooleanField()
    # this is the rating that a borrower can give to the Listing
    rating = models.IntegerField()  # maybe add allowed integers later;
    # these are likes/dislikes for the review, such as if it was helpful
    review_likes = models.IntegerField()
    review_dislikes = models.IntegerField()


class ListingImage(models.Model):
    image_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField()
    top_image = models.BooleanField()
