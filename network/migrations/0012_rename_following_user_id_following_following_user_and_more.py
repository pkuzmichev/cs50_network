# Generated by Django 4.0.4 on 2022-05-17 17:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0011_following'),
    ]

    operations = [
        migrations.RenameField(
            model_name='following',
            old_name='following_user_id',
            new_name='following_user',
        ),
        migrations.RenameField(
            model_name='following',
            old_name='user_id',
            new_name='user',
        ),
    ]