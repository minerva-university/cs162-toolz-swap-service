from django.urls import path
from . import filterviews

urlpatterns = [
    path('listing/neighborhoods/', filterviews.ListingForNeighborhoodViewSet.as_view(), 
    name='listing for neighborhood'),
    path('listing/cities/', filterviews.ListingForCityViewSet.as_view(), 
    name='listing for city'),
    path('listing/reviews/', filterviews.ListingReviewViewSet.as_view(), 
    name='reviews for listing'),
    path('listing/requests/', filterviews.ListingRequestViewSet.as_view(), 
    name='requests for listing'),
    path('requests/', filterviews.RequestMadeByUserViewSet.as_view(), name='request made by user'),
    path('myrequests/', filterviews.RequestMadeToUserViewSet.as_view(), name='request made to user'),
    path('listing/user/', filterviews.ListingByUserViewSet.as_view(), name='request made to user'),
]