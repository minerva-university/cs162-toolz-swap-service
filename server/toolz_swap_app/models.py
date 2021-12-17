import uuid

from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
import base64
import os 
import requests
import json
from dotenv import load_dotenv

load_dotenv()
import datetime
from django.utils import timezone



class City(models.Model):
    """
    Stores information about the city related to user, listing.
    """
    city_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    population = models.IntegerField(blank=True, null=True)
    size_sqkm = models.FloatField(blank=True, null=True)

    class Meta:
        indexes = [models.Index(fields=['name',]),]


    def __str__(self):
        return f"<city:{self.name}, \
                population:{self.population},\
                size_sqkm:{self.size_sqkm};"


class Neighborhood(models.Model):
    """
    Stores information about a given neighborhood related to a listing.
    """
    neighborhood_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    population = models.IntegerField(blank=True, null=True)
    size_sqkm = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"<neighborhood:{self.name}, \
                city:{self.city}, \
                population:{self.population},\
                size_sqkm:{self.size_sqkm};"
    class Meta:
        indexes = [
            models.Index(fields=['name',]),]


class ToolType(models.Model):
    """
    Stores information about given tool type
    """
    tool_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    purpose = models.TextField()
    popularity = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"<tool:{self.name}, \
                purpose:{self.purpose},\
                popularity:{self.popularity};"

    class Meta:
        indexes = [
            models.Index(fields=['name',]),]


class Brand(models.Model):
    """
    Stores information about a given tool brand.
    """
    brand_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    item_image = models.ImageField(upload_to='brand_images', blank=True, null=True)
    item_image_url = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"<brand:{self.name};"
    
    class Meta:
        indexes = [
            models.Index(fields=['name',]),]

    def save(self, *args, **kwargs):
        if self.item_image:
            encodedString = base64.b64encode(self.item_image.file.read())
            data = {"key": os.environ.get("IMG_BB"), "image": encodedString.decode("utf-8")}
            uploadedImageInfo = requests.post("https://api.imgbb.com/1/upload", data=data)
            jsonResponse = json.loads(uploadedImageInfo.text)
            self.item_image_url = jsonResponse["data"]["display_url"]
        super().save(*args, **kwargs)


class ToolModel(models.Model):
    """
    Stores information about a tool's model and ist release date.
    """
    model_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    year_released = models.IntegerField()

    def __str__(self):
        return f"<tool:{self.name}, \
                year_released:{self.year_released};"


class User(AbstractUser):
    """
    Stores our user information. Inherits basic attributes from Django's AbstractUser
    """
    phone = models.CharField(max_length=200,
                             blank=True)  # leaving this as a charfield, since Django only supports
    # US phones which will become problematic if we wanted to have international phone numbers
    address = models.CharField(max_length=200, blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    saved_places = models.ManyToManyField('Listing', related_name='saved_places')
    rented_tools = models.ManyToManyField('Listing', related_name='rented_tools')
    item_image = models.ImageField(upload_to='brand_images', null=True, blank=True)
    item_image_url = models.TextField(blank=True, null=True)
    bio = models.CharField(max_length=200, blank=True)
    rating_average = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"<username:{self.username}, \
                first_name:{self.first_name},\
                last_name:{self.last_name}, \
                email:{self.email};"
    
    class Meta:
        indexes = [
            models.Index(fields=['first_name', 'last_name',]),]

    def save(self, *args, **kwargs):
        if self.item_image:
            encodedString = base64.b64encode(self.item_image.file.read())
            data = {"key": os.environ.get("IMG_BB"), "image": encodedString.decode("utf-8")}
            uploadedImageInfo = requests.post("https://api.imgbb.com/1/upload", data=data)
            jsonResponse = json.loads(uploadedImageInfo.text)
            self.item_image_url = jsonResponse["data"]["display_url"]
        super().save(*args, **kwargs)


class Listing(models.Model):
    """
    Stores information about a given listing
    """
    listing_id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True,
                                  help_text='Unique ID for this particular listing')
    title = models.CharField(max_length=200)
    owner = models.ForeignKey(
        User, on_delete=models.RESTRICT, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    model = models.ForeignKey(ToolModel, on_delete=models.CASCADE)
    tool_category = models.ForeignKey(ToolType, on_delete=models.CASCADE)
    price = models.FloatField(blank=True, null=True)
    address = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.CASCADE)
    description = models.TextField(max_length=2000)
    created_on = models.DateTimeField(auto_now_add=True)
    rating_average = models.FloatField(blank=True, null=True, default=0)  # average rating of the listing, can be calculated from ListingReviews

    # likes=models.IntegerField()
    # dislikes=models.IntegerField()

    def __str__(self):
        return f"<listing_id:{self.listing_id}, title:{self.title};"
    
    class Meta:
        indexes = [
            models.Index(fields=['title',]),]


class ListingRequest(models.Model):
    """
    Stores information about a listing request (when the user requests a tool through the listing)
    """
    request_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    created_on = models.DateTimeField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipient')
    body = models.TextField()
    renting_start = models.DateTimeField(auto_now_add=True)
    renting_end = models.DateTimeField()
    approved = models.BooleanField()

    def __str__(self):
        return f"<listing:{self.listing}, \
                author:{self.author},\
                approved:{self.approved};"


class ListingReview(models.Model):
    """
    Stores information about a listing review (after the renting is over and the tool is returned to the owner)
    """
    review_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    top_review = models.BooleanField()
    # this is the rating that a borrower can give to the Listing
    rating = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)])

    # these are likes/dislikes for the review, such as if it was helpful
    review_likes = models.IntegerField()
    review_dislikes = models.IntegerField()

    def __str__(self):
        return f"<listing:{self.listing}, \
                author:{self.author},\
                rating:{self.rating};"

    class Meta:
        indexes = [
            models.Index(fields=['rating',]),
            models.Index(fields=['listing',]),]

    def get_reviews_for_listing(self, listing_id):
        """
        Returns the reviews for a listing given the listing id
        """
        reviews = ListingReview.objects.filter(listing__pk=listing_id)
        return reviews

    # custom save function to automatically update ratings for a listing upon review submission
    def save(self, *args, **kwargs):
        listing_id = str(self.listing.listing_id)
        a = list(self.get_reviews_for_listing(listing_id))
        b= self.rating
        length = len(a)+1
        if length != 0:
            for i in a:
                #print(type(i['rating']))
                b += i.rating
            avg = b/length
            update = Listing.objects.filter(listing_id=self.listing.listing_id).update(rating_average=round(avg,2))
        super().save(*args, **kwargs)


class ListingImage(models.Model):
    """
    Stores listing image data.
    """
    image_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    item_image = models.ImageField(upload_to='listing_images', blank=True, null=True)
    item_image_url = models.TextField(blank=True, null=True)
    top_image = models.BooleanField(default=False)

    def __str__(self):
        return f"<image_id:{self.image_id}, \
                listing:{self.listing}, \
                item_image_url:{self.item_image_url};"

    def save(self, *args, **kwargs):
        if self.item_image:
            encodedString = base64.b64encode(self.item_image.file.read())
            data = {"key": os.environ.get("IMG_BB"), "image": encodedString.decode("utf-8")}
            uploadedImageInfo = requests.post("https://api.imgbb.com/1/upload", data=data)
            jsonResponse = json.loads(uploadedImageInfo.text)
            self.item_image_url = jsonResponse["data"]["display_url"]
        super().save(*args, **kwargs)