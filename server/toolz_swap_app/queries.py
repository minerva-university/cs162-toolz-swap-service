from .models import User, City, Neighborhood, ToolType, Brand, ToolModel, Listing, ListingRequest, ListingReview, ListingImage
from django.db.models import Avg


# TODO: Pls return the model objects, Vlad and I can process the data how we see fit
# TODO: see get_user_by_id example
def get_user_by_id(user_id):
    user = User.objects.get(pk=user_id)
    return user

def get_user_by_username(username):
    user = User.objects.get(username=username)
    return user


def get_listing_by_id(listing_id):
    listing = Listing.objects.get(pk=listing_id)
    return listing


def get_images_for_listing(listing_id):
    listingimages = ListingImage.objects.filter(listing__pk=listing_id)
    return listingimages


def get_all_listings_for_neighborhood(neighborhood_id):
    neighborhood_listings = Listing.objects.filter(neighborhood__pk = neighborhood_id)
    return neighborhood_listings


def get_all_cities():
    """
    Returns all cities in db
    """
    cities = City.objects.all()
    return cities


def get_all_listings():
    listings = Listing.objects.all()
    return listings


def get_all_neighborhoods_in_city(city_id):
    neighborhoods = Neighborhood.objects.filter(city__pk=city_id)
    return neighborhoods


def get_all_listings_for_city(city_id):
    city_listings = Listing.objects.filter(city__pk=city_id)
    return city_listings


def get_tool_by_id(tool_id):
    tool = ToolType.objects.get(pk=tool_id)
    return tool


def get_all_tools_listed_by_owner(user_id):
    listed_by_owner = Listing.objects.filter(owner__pk=user_id)
    return listed_by_owner



def get_all_tools_rented_by_user(user_id):
    rented = User.objects.filter(pk=user_id).rented_tools.all()
    return rented



def get_reviews_for_listing(listing_id):
    reviews = ListingReview.objects.filter(listing__pk=listing_id)
    return reviews


def get_average_review_ratings_for_tool(listing_id):
    avg_rating = Listing.objects.get(pk=listing_id).rating_average
    return avg_rating


def get_average_review_ratings_for_user(user_id):
    """
    Should return the average for a user if the user has ever listed
    else 0
    """
    user_listings = Listing.objects.filter(owner__pk=user_id)
    if user_listings.exists():
        ratings = user_listings.aggregate(Avg('rating_average'))['rating_average__avg']
    else:
        ratings = 0
    
    return ratings
