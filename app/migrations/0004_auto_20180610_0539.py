# Generated by Django 2.0.6 on 2018-06-10 05:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20180610_0417'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='lotacaoponto',
            options={'ordering': ['-collected']},
        ),
    ]