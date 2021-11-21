from django.shortcuts import render
from .models import User, Tool, Listing, Swaps

# Create your views here.
def index(request):
    """View function for home page of site."""

    # Generate counts of some of the main objects
    num_books = Tool.objects.all().count()
    num_instances = Listing.objects.all().count()

    # Available books (status = 'a')
    #num_instances_available = BookInstance.objects.filter(status__exact='a').count()

    # The 'all()' is implied by default.
    num_users = User.objects.count()

    context = {
        'num_books': num_books,
        'num_instances': num_instances,
        'num_authors': num_users,
    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'homepage.html', context=context)