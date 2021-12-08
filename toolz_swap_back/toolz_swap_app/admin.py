from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Listings, ToolTypes

class CustomUserAdmin(UserAdmin):
    pass
admin.site.register(User, CustomUserAdmin)

class ListingsInstanceInline(admin.TabularInline):
    model = Listings

# Define the admin Tool class
@admin.register(ToolTypes)
class ToolTypeAdmin(admin.ModelAdmin):
    list_display = ('tool_id', 'name', 'purpose', 'popularity')
    list_filter = ('name', 'purpose')
    inlines = [ListingsInstanceInline]

@admin.register(Listings)
class ListingAdmin(admin.ModelAdmin):
    list_display = ('lenderId', 'toolId', 'created', 'expires')


#admin.site.register(Tool)
#admin.site.register(Listing)
#admin.site.register(Swaps)