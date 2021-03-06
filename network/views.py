import imp
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.core.paginator import Paginator
from datetime import datetime
from django.db.models import F

from .models import Following, User, Post, PostLikes


def index(request):
    posts = Post.objects.filter(
        username=request.user.username).order_by('-time').values_list()
    paginator = Paginator(posts, 10)
    page = request.GET.get('page', 1)
    return render(request, "network/index.html", {
        "header": "All Posts",
        "posts": posts,
        "page_obj": paginator.get_page(page)
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
            user_id=request.user.pk,
            username=request.user.username,
            text=request.POST['new_post']
        )
    return HttpResponseRedirect(reverse("index"))


def user(request, user):
    posts = Post.objects.filter(username=user).order_by('-time').values_list()
    paginator = Paginator(posts, 10)
    page = request.GET.get('page', 1)

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
        "posts": posts,
        "page_obj": paginator.get_page(page)
    })


def follow(request, follow_user):

    is_following = Following.objects.filter(
        user_id=User.objects.get(username=request.user).pk,
        following_user_id=User.objects.get(username=follow_user).pk).count()

    # delete
    if is_following > 0:
        Following.objects.filter(
            user_id=User.objects.get(username=request.user).pk,
            following_user_id=User.objects.get(username=follow_user)
                .pk).delete()
       
    # create
    else:
        if request.method == 'POST':
            Following.objects.create(
                user_id=User.objects.get(username=request.user).pk,
                following_user=User.objects.get(username=follow_user))
    
    return HttpResponseRedirect(reverse('user', kwargs={
        'user': follow_user
        }))


def get_likes(request):
    is_liked = False
    if PostLikes.objects.filter(
                post_id=request.headers['post-id']):
                is_liked = True
    else:
        is_liked = False
    data = {}
    response = JsonResponse(data, status=200)
    response['is_liked'] = is_liked
    return response


def like(request):
    if request.method == "PUT":
        if PostLikes.objects.filter(
                post_id=request.headers['post-id'], user_id=request.user.pk):
            return HttpResponse(status=409)
        else:
            Post.objects.filter(
                id=request.headers['post-id']).update(likes=F('likes') + 1)
            PostLikes.objects.create(
                post_id=request.headers['post-id'], user_id=request.user.pk)

    elif request.method == "DELETE":
        if PostLikes.objects.filter(
                post_id=request.headers['post-id'], user_id=request.user.pk):
                    post_likes = PostLikes.objects.filter(
                        post_id=request.headers['post-id'], user_id=request.user.pk)
                    post_likes.delete()
                    Post.objects.filter(
                        id=request.headers['post-id']).update(likes=F('likes') - 1)
    return HttpResponseRedirect(reverse("index"))


def following(request):
    try:
        following_users = Following.objects.all().filter(
            user_id=request.user.pk).values_list('following_user_id')[0]
    except:
        return HttpResponseRedirect(reverse("index"))
    all_following_posts = Post.objects.all().filter(user_id=following_users)
    posts = all_following_posts.order_by('-time').values_list()

    paginator = Paginator(posts, 10)
    page = request.GET.get('page', 1)
    
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("index"))
    return render(request, "network/index.html", {
        "header": "Following",
        "posts": posts,
        "page_obj": paginator.get_page(page)
    })


def edit(request):
    if request.method == "PUT":
        Post.objects.filter(
            id=request.headers['post-id']
        ).update(text=request.headers['updateText'])
    return HttpResponseRedirect(reverse("index"))
