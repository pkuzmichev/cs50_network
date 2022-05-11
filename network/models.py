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
