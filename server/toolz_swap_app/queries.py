from toolz_swap_app.models import User, City


# TODO: Pls return the model objects, Vlad and I can process the data how we see fit
# TODO: see get_user_by_id example
def get_user_by_id(user_id):
    user = User.objects.get(pk=user_id)
    return user


def get_listing_by_id(listing_id):
    pass


def get_images_for_listing(listing_id):
    pass


def get_all_listings_for_neighborhood(neighborhood_id):
    pass


def get_all_cities():
    """
    Returns all cities in db
    """
    cities = City.objects.all()
    return cities


def get_all_listings():
    pass


def get_all_neighborhoods_in_city(city_id):
    pass


def get_all_listings_for_city(city_id):
    pass


def get_tool_by_id(tool_id):
    pass


def get_all_tools_listed_by_owner(user_id):
    pass
