import uuid

from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


#  TODO: add Admin views in admin.py

class City(models.Model):
    """
    Stores information about the city related to user, listing.
    """
    city_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    population = models.IntegerField(blank=True, null=True)
    size_sqkm = models.FloatField(blank=True, null=True)

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


class Brand(models.Model):
    """
    Stores information about a given tool brand.
    """
    brand_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)
    logo = models.ImageField(blank=True, null=True)

    def __str__(self):
        return f"<brand:{self.name};"


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
    profile_photo = models.ImageField(null=True, blank=True)
    bio = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"<username:{self.username}, \
                first_name:{self.first_name},\
                last_name:{self.last_name}, \
                email:{self.email};"


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
    address = models.CharField(max_length=200)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.CASCADE)
    description = models.TextField(max_length=2000)
    created_on = models.DateTimeField(auto_now_add=True)
    rating_average = models.FloatField(blank=True, null=True)  # average rating of the listing, can be
    # calculated from ListingReviews

    # likes=models.IntegerField()
    # dislikes=models.IntegerField()

    def __str__(self):
        return f"<listing_id:{self.listing_id}, title:{self.title};"


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


class ListingImage(models.Model):
    """
    Stores listing image data.
    """
    image_id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField()
    top_image = models.BooleanField()

    def __str__(self):
        return f"<image_id:{self.image_id}, \
                listing:{self.listing};"
