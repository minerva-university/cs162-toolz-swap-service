# Generated by Django 3.2.9 on 2021-12-11 16:53

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('toolz_swap_app', '0003_auto_20211209_0903'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='created_on',
        ),
        migrations.AlterField(
            model_name='listingreview',
            name='rating',
            field=models.IntegerField(validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)]),
        ),
    ]
