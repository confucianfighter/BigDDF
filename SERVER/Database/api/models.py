from django.db import models

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
# Create your models here.
class CoinHistory(models.Model):
    symbol = models.CharField(primary_key=True, max_length=150)
    timestamp = models.DateTimeField()
    price = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    total_volume = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    market_cap = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'coin_history'
        unique_together = (('symbol', 'timestamp'),)

class CoinGeckoCoinInfo(models.Model):
    coin_id = models.TextField(blank=True, null=True, unique=True)
    symbol = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    image = models.TextField(blank=True, null=True)
    last_updated = models.DateTimeField(blank=True, null=True)
    current_price = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    market_cap = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    market_cap_rank = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    fully_diluted_valuation = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    total_volume = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    high_24h = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    low_24h = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    price_change_24h = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    price_change_percentage_24h = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    market_cap_change_24h = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    market_cap_change_percentage_24h = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    circulating_supply = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    total_supply = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    max_supply = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    ath = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    ath_change_percentage = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    ath_date = models.DateTimeField(blank=True, null=True)
    atl = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    atl_change_percentage = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)
    atl_date = models.DateTimeField(blank=True, null=True)
    roi = models.DecimalField(max_digits=100, decimal_places=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'coin_gecko_coin_info'
