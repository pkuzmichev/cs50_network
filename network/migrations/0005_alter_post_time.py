# Generated by Django 4.0.4 on 2022-05-11 13:27

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0004_auto_20220508_1424'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='time',
            field=models.DateField(default=datetime.datetime(2022, 5, 11, 13, 27, 2, tzinfo=datetime.timezone(datetime.timedelta(0), 'UTC')), max_length=30),
        ),
    ]
