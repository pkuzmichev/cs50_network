# Generated by Django 4.0.4 on 2022-05-11 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0008_alter_post_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='time',
            field=models.DateTimeField(auto_created=True),
        ),
    ]
