import os
from datetime import datetime, timedelta
from statistics import mean
from toolz_swap_app.models import Listing, ListingReview
import uuid
from django.forms.models import model_to_dict
from django.utils import timezone

a = list(ListingReview.objects.filter(listing__pk="bb81d2dd-65f4-4e72-9b16-1bab70b33926").values('rating', 'listing__title'))
print(a)
b=0
length = len(a)
for i in a:
    print(type(i['rating']))
    b += i['rating']

avg = b/length

listing = Listing.objects.filter(listing_id="bb81d2dd-65f4-4e72-9b16-1bab70b33926").update(rating_average=avg)


'''
    def save(self, *args, **kwargs):

        if self.created_at is None:
            #throughout project, I will use Django timezone.now(). datetime is a naive time object, want to avoid
            self.created_at = timezone.now()
        super().save(*args, **kwargs)'''