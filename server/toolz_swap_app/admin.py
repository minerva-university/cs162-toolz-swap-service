from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Listing, ToolType


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
