from audioop import maxpp
from tkinter.tix import Tree
from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


class User(AbstractUser):
    pass

class Post(models.Model):
    username = models.CharField(max_length=30)
    time = models.DateTimeField(auto_created=True, auto_now=True)
    text = models.CharField(max_length=148)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return self.text

class Following(models.Model):
    user_id = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    following_user_id = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    # TODO: read: https://stackoverflow.com/questions/58794639/how-to-make-follower-following-system-with-django-model
