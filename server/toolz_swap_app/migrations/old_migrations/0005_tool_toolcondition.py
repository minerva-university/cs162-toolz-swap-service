# Generated by Django 3.2.9 on 2021-11-22 02:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('toolz_swap_app', '0004_alter_user_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='tool',
            name='toolCondition',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
