from rest_framework import serializers
from .models import CoinHistory

class CoinHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CoinHistory
        fields = (
            'symbol',
            'timestamp',
            'price',
            'total_volume',
            'market_cap'
        )
    ###
###