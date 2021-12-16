# Generated by Django 3.2.9 on 2021-12-16 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('toolz_swap_app', '0017_merge_20211216_0832'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listing',
            name='item_image',
        ),
        migrations.RemoveField(
            model_name='listing',
            name='item_image_url',
        ),
        migrations.RemoveField(
            model_name='listingimage',
            name='image',
        ),
        migrations.RemoveField(
            model_name='user',
            name='profile_photo',
        ),
        migrations.AddField(
            model_name='listingimage',
            name='item_image',
            field=models.ImageField(blank=True, default='listing_images/default.jpg', null=True, upload_to='listing_images'),
        ),
        migrations.AddField(
            model_name='listingimage',
            name='item_image_url',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='item_image',
            field=models.ImageField(blank=True, default='brand_images/default.jpg', null=True, upload_to='brand_images'),
        ),
        migrations.AddField(
            model_name='user',
            name='item_image_url',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='listing',
            name='rating_average',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]