# Generated by Django 3.2.9 on 2021-12-17 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('toolz_swap_app', '0020_auto_20211217_1402'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='item_image',
            field=models.ImageField(blank=True, null=True, upload_to='listing_images'),
        ),
        migrations.AddField(
            model_name='listing',
            name='item_image_url',
            field=models.TextField(blank=True, null=True),
        ),
    ]
