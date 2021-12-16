from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Listing, ToolType, City, Neighborhood, \
    Brand, ToolModel, ListingRequest, ListingReview, ListingImage


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'Extra User Information',
            {
                'fields': (
                    'phone',
                    'address',
                    'city',
                    'rented_tools',
                    'saved_places',
                    'bio'
                ),
            },
        ),

    )


admin.site.register(User, CustomUserAdmin)


class ListingsInstanceInline(admin.TabularInline):
    model = Listing


# Define the admin Tool class
@admin.register(ToolType)
class ToolTypeAdmin(admin.ModelAdmin):
    list_display = ('tool_id', 'name', 'purpose', 'popularity')
    list_filter = ('name', 'purpose')
    inlines = [ListingsInstanceInline]


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ('listing_id', 'title', 'owner', 'brand', 'model', 'tool_category')


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('city_id', 'name', 'population', 'size_sqkm')


@admin.register(Neighborhood)
class NeighborhoodAdmin(admin.ModelAdmin):
    list_display = ('neighborhood_id', 'name', 'city', 'population', 'size_sqkm')


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('brand_id', 'name', 'item_image_url')


@admin.register(ToolModel)
class ToolModelAdmin(admin.ModelAdmin):
    list_display = ('model_id', 'name', 'year_released')


@admin.register(ListingRequest)
class ListingRequestAdmin(admin.ModelAdmin):
    list_display = ('request_id', 'listing', 'created_on', 'author', 'recipient',
                    'body', 'renting_start', 'renting_end', 'approved')


@admin.register(ListingReview)
class ListingReviewAdmin(admin.ModelAdmin):
    list_display = ('review_id', 'listing', 'created_on', 'author',
                    'body', 'top_review', 'rating', 'review_likes', 'review_dislikes')


@admin.register(ListingImage)
class ListingImageAdmin(admin.ModelAdmin):
    list_display = ('image_id', 'listing', 'created_on', 'author', 'item_image_url', 'top_image')
