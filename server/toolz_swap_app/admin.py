from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Tool, Listing, Swaps


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'Extra User Details',
            {
                'fields': (
                    #'phone',
                    #'address',
                    #'city',
                    #'state',
                    #'zipcode'
                )
            }
        )
    )


admin.site.register(User, CustomUserAdmin)


class ListingsInstanceInline(admin.TabularInline):
    model = Listing


# Define the admin Tool class
@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ('toolName', 'toolBrand', 'toolModel')
    list_filter = ('toolName', 'toolBrand')
    inlines = [ListingsInstanceInline]


@admin.register(Swaps)
class SwapsAdmin(admin.ModelAdmin):
    list_display = ('borrowerId', 'listingId', 'date', 'expires')


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ('lenderId', 'toolId', 'created', 'expires')
