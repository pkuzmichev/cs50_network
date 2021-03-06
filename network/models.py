from audioop import maxpp
from tkinter.tix import Tree
from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


class User(AbstractUser):
    pass


class Post(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    username = models.CharField(max_length=30)
    time = models.DateTimeField(auto_created=True, auto_now=True)
    text = models.CharField(max_length=148)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return self.text

    
class PostLikes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)


class Following(models.Model):
    user = models.ForeignKey("User", related_name='following', on_delete=models.CASCADE)
    following_user = models.ForeignKey("User", related_name='followers', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return f'{self.user} follow {self.following_user} at {self.created}'
