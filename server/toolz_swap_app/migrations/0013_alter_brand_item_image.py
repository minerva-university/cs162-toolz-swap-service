# Generated by Django 3.2.9 on 2021-12-14 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('toolz_swap_app', '0012_auto_20211214_0809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='brand',
            name='item_image',
            field=models.ImageField(blank=True, default='CS113_concept_map.png', null=True, upload_to='post_images'),
        ),
    ]
