# Generated by Django 4.1.9 on 2023-06-11 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='Message_id',
            field=models.PositiveIntegerField(),
        ),
    ]
