from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Tool, Listing, Swaps

class CustomeUserAdmin(UserAdmin):
    pass

admin.site.register(User, CustomeUserAdmin)

admin.site.register(Tool)
admin.site.register(Listing)
admin.site.register(Swaps)