# Generated by Django 4.0.2 on 2022-02-25 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_coingeckocoininfo_coin_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coingeckocoininfo',
            name='coin_id',
            field=models.TextField(blank=True, null=True, unique=True),
        ),
    ]