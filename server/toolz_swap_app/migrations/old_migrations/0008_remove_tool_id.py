# Generated by Django 3.2.9 on 2021-12-07 12:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('toolz_swap_app', '0007_alter_tool_tool_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tool',
            name='id',
        ),
    ]
