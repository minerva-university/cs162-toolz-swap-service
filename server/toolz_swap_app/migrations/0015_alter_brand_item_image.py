# Generated by Django 3.2.9 on 2021-12-14 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('toolz_swap_app', '0014_alter_brand_item_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand',
            name='item_image',
            field=models.ImageField(blank=True, default='brand_images/default.jpg', null=True, upload_to='brand_images'),
        ),
    ]
