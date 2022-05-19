from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from datetime import datetime

from .models import Following, User, Post


def index(request):
    return render(request, "network/index.html", {
        "posts": Post.objects.filter(username=request.user.username)
        .order_by('-time').values_list()
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def new_post(request):
    if request.method == "POST":
        Post.objects.create(
            username=request.user.username,
            text=request.POST['new_post']
        )
    return HttpResponseRedirect(reverse("index"))


def user(request, user):

    is_following = Following.objects.filter(
        user_id=User.objects.get(username=request.user).pk,
        following_user_id=User.objects.get(username=user).pk)

    followers_count = Following.objects.filter(
        following_user_id=User.objects.get(username=user).pk).count()

    following_count = Following.objects.filter(
        user_id=User.objects.get(username=user).pk).count()

    return render(request, "network/user.html", {
        "username": user,
        'is_following': is_following,
        'followers_count': followers_count,
        'following_count': following_count,
        "posts": Post.objects.filter(username=user)
            .order_by('-time').values_list()
    })


def follow(request, follow_user):

    is_following = Following.objects.filter(
        user_id=User.objects.get(username=request.user).pk,
        following_user_id=User.objects.get(username=follow_user).pk).count()

    # delete
    if is_following > 0:
        print('Delete')
        Following.objects.filter(
            user_id=User.objects.get(username=request.user).pk,
            following_user_id=User.objects.get(username=follow_user)
                .pk).delete()
       
    # create
    else:
        if request.method == 'POST':
            print('POST')
            Following.objects.create(
                user_id=User.objects.get(username=request.user).pk,
                following_user=User.objects.get(username=follow_user))
    
    return HttpResponseRedirect(reverse('user', kwargs={
        'user': follow_user
        }))


def like(request):
    pass
    # TODO: POST
    # TODO: DELETE


def following(request):

    # get user id by username
    # f = Following.objects.filter(user_id=request.user.pk)
    # print(f)
    # print(f.values_list()[0][2])

    filter = Following.objects.all().filter(user_id=request.user.pk)

    print('filter', filter.values_list('following_user_id'))
    # TODO:
    # > get user id follow
    # get username by user_id
    # get all posts from user


    # print('following_user_id', filter.get('following_user_id'))
    # print('following_user', filter['following_user'])

    # TODO: https://docs.djangoproject.com/en/4.0/topics/db/queries/

    # get users following
    # get posts from users
    # TODO: create following page
    # return posts from following
    return render(request, "network/index.html", {
        "posts": Post.objects.filter(username=request.user.username)
        .order_by('-time').values_list()
    })
