from audioop import maxpp
from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


class User(AbstractUser):
    pass

class Post(models.Model):
    username = models.CharField(max_length=30)
    time = models.CharField(
        default=datetime.now().replace(microsecond=0).astimezone,
        max_length=30
    )
    text = models.CharField(max_length=148)
    likes = models.IntegerField(default=0)
