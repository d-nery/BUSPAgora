# Generated by Django 2.0.6 on 2018-06-10 04:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20180610_0258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lotacaoponto',
            name='collected',
            field=models.DateTimeField(),
        ),
    ]
