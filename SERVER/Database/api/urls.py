from django.contrib import admin
from django.urls import path
from django.urls import path, include
from .views import CoinHistoryEntryView, CoinHistoryListView

"""🔥🔥🔥 Our Entry Point: 🔥🔥🔥"""
urlpatterns = [
    path('CoinHistory/InsertRow', CoinHistoryEntryView.as_view()),
    path('CoinHistory/List' , CoinHistoryListView.as_view()),
    path('', include('frontend.urls'))
]