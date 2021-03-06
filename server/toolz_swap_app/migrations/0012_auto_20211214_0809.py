# Generated by Django 3.2.9 on 2021-12-14 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('toolz_swap_app', '0011_brand_image_url'),
    ]

    operations = [
        migrations.RenameField(
            model_name='brand',
            old_name='image_url',
            new_name='item_image_url',
        ),
        migrations.RemoveField(
            model_name='brand',
            name='logo',
        ),
        migrations.AddField(
            model_name='brand',
            name='item_image',
            field=models.ImageField(blank=True, null=True, upload_to='post_images'),
        ),
    ]
