# Generated by Django 2.0.6 on 2018-06-10 07:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20180610_0539'),
    ]

    operations = [
        migrations.AddField(
            model_name='ponto',
            name='ultimo_circular',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.Circular'),
        ),
    ]
