from .views import main
from .views import path
from django.urls import path

urlpatterns = [
    #calls api/views.py/main function whenever any url as sent:
    path('', main) 
]


