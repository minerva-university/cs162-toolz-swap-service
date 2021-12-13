from .models import User, City, Neighborhood, ToolType, Brand, ToolModel, Listing, ListingRequest, ListingReview, ListingImage
from django.db.models import Avg



def get_user_by_id(user_id):
    """
    Returns the user given the id
    """
    user = User.objects.get(pk=user_id)
    return user

def get_user_by_username(username):
    """
    returns the user given the username
    """
    user = User.objects.get(username=username)
    return user


def get_listing_by_id(listing_id):
    """
    Returns the listing given the id
    """
    listing = Listing.objects.get(pk=listing_id)
    return listing


def get_images_for_listing(listing_id):
    """
    Returns the image object given the listing id
    """
    listingimages = ListingImage.objects.filter(listing__pk=listing_id)
    return listingimages


def get_all_listings_for_neighborhood(neighborhood_id):
    """
    Returns all listings given the neighborhood id
    """
    neighborhood_listings = Listing.objects.filter(neighborhood__pk = neighborhood_id)
    return neighborhood_listings


def get_all_cities():
    """
    Returns all cities in db
    """
    cities = City.objects.all()
    return cities


def get_all_listings():
    '''
    returns the listing given the id
    '''
    listings = Listing.objects.all()
    return listings


def get_all_neighborhoods_in_city(city_id):
    """
    returns all the neighborhoods given city id
    """
    neighborhoods = Neighborhood.objects.filter(city__pk=city_id)
    return neighborhoods


def get_all_listings_for_city(city_id):
    """
    returns all listings given the city id
    """
    city_listings = Listing.objects.filter(city__pk=city_id)
    return city_listings


def get_tool_by_id(tool_id):
    """
    returns the tool given the id
    """
    tool = ToolType.objects.get(pk=tool_id)
    return tool


def get_all_tools_listed_by_owner(user_id):
    """
    returns the tool listings given the owner's id
    """
    listed_by_owner = Listing.objects.filter(owner__pk=user_id)
    return listed_by_owner



def get_all_tools_rented_by_user(user_id):
    """
    Returns the listings rented by the user given the user's id
    """
    rented = User.objects.filter(pk=user_id).rented_tools.all()
    return rented



def get_reviews_for_listing(listing_id):
    """
    Returns the reviews for a listing given the listing id
    """
    reviews = ListingReview.objects.filter(listing__pk=listing_id)
    return reviews


def get_average_review_ratings_for_tool(listing_id):
    """
    Returns the average rating given a listing id
    """
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
