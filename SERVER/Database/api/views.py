from django.shortcuts import render
from rest_framework import generics
from .serializers import CoinHistorySerializer
from .models import CoinHistory
# Create your views here.

class CoinHistoryEntryView(generics.CreateAPIView):
    queryset = CoinHistory.objects.all()
    serializer_class = CoinHistorySerializer

class CoinHistoryListView(generics.ListAPIView):
    queryset = CoinHistory.objects.all()
    serializer_class = CoinHistorySerializer
    
