from django.shortcuts import get_object_or_404, redirect, render
from accountsapi.serializers import EmailOtpLoginSerializer, LoginSerializer, ProfileSerializer, RegisterSerializer

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from .utils import generate_otp


from django.contrib.auth.models import User

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth import authenticate

from .utils import generate_otp
import pyotp
import requests
from django.conf import settings
from django.shortcuts import redirect
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages

import random


from django.contrib.auth import authenticate, login

# Create your views here.

def post_list(request):
    posts = Post.objects.all()  # Retrieve all posts from the database
    return render(request, 'blog/post_list.html', {'posts':posts})




# def post_list(request):
#     posts = Post.objects.all()
#     # return HttpResponse(f"List of Posts (You are in main blog page): {posts}")  
#     return render(request, 'blog/post_list.html', {'posts': posts})


def post_detail(request, id):
    post = get_object_or_404(Post, pk=id)
    return render(request, 'blog/post_detail.html', {'post': post})

# def post_list(request):
#     posts = Post.objects.all()  # Retrieve all posts from the database
#     return HttpResponse(f"List of Posts (You are in main blog page): {posts}")  # Return a simple HttpResponse for demonstration
#     # return render(request, 'blog/post_list.html', {'posts': posts})

# Now, let's create a view to display the details of a specific blog post based on its ID.
# def post_detail(request, id):
#     post = get_object_or_404(Post, pk=id)  # Fetch the post by ID or return a 404 error if not found
#     return HttpResponse(f"Post Detail: {post}")  # Return a simple HttpResponse for demonstration
#     # return render(request, 'blog/post_detail.html', {'post': post})




def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = User.objects.get(username='sai')
            post.published_date = timezone.now()
            post.save()

            # messages.success(request, "Post successfully created!")
            return redirect('post_list')
    else:
        form = PostForm()
    return render(request, 'blog/post_edit.html', {'form': form})

def post_edit(request, id):
    post = get_object_or_404(Post, pk=id)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = User.objects.get(username='sai')
            post.published_date = timezone.now()
            post.save()

            # messages.success(request, "Post successfully edited!")
            return redirect('post_detail', id=post.pk)
    else:
        form = PostForm(instance=post)
    return render(request, 'blog/post_edit.html', {'form': form, 'post':post})


##------------------------------------------- URL to Discord's OAuth2 authorization page
def discord_login(request):
    # url to discords auth page
    discord_auth_url = (
        f"https://discord.com/api/oauth2/authorize?client_id={settings.DISCORD_CLIENT_ID}"
        f"&redirect_uri={settings.DISCORD_REDIRECT_URI}"
        f"&response_type=code&scope=identify"
    )
    return redirect(discord_auth_url)

def discord_callback(request):
    # handle the callback from discord
    code = request.GET.get('code')
    if not code:
        return JsonResponse({'error': 'No code provided'}, status=400)

    # exchange the code for an access token
    token_url = 'https://discord.com/api/oauth2/token'
    data = {
        'client_id': settings.DISCORD_CLIENT_ID,
        'client_secret': settings.DISCORD_CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': settings.DISCORD_REDIRECT_URI,
        'scope': 'identify',
    }
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response = requests.post(token_url, data=data, headers=headers)

    if response.status_code != 200:
        return JsonResponse({'error': 'Failed to get token'}, status=400) # uh oh!

    access_token = response.json().get('access_token')

    # fetch details from discord
    user_url = 'https://discord.com/api/users/@me'
    headers = {'Authorization': f'Bearer {access_token}'}
    user_response = requests.get(user_url, headers=headers)

    if user_response.status_code != 200:
        return JsonResponse({'error': 'Failed to fetch user data'}, status=400)

    user_data = user_response.json()
    discord_id = user_data['id']
    username = user_data['username']

    # # store user session or database entry
    # request.session['discord_id'] = discord_id
    # request.session['username'] = username
    # request.session['discriminator'] = discriminator
    
    # now we need to get the profile pic
    avatar = user_data['avatar']
    pfp_url = f"https://cdn.discordapp.com/avatars/{discord_id}/{avatar}?size=1024" # pretty sure thats correct 

    return JsonResponse({'username': username, 'avatar': pfp_url}, status=200)


jokes = [
    "Why don't flat-earthers argue about the Earth's edges? Because they don't want to fall out of the group chat!",
    "Flat Earth meetings are always packed—it's hard to find room when everyone's on the same plane.",
    "I told my flat-earther friend the Earth is round. He said, 'I'm not falling for that again!'",
    "Why don't flat-earthers go on vacations? They're afraid of falling off the itinerary.",
    "Flat-earthers' favorite exercise? Running laps—on a very flat track, of course.",
    "Flat-earthers don't believe in gravity. They say, 'Things just fall because they're tired of floating!'",
    "How do flat-earthers measure time? They go by sun-dial… as long as it's flat.",
    "Flat-earthers love pancakes—finally, food they can relate to!",
    "I asked a flat-earther what's under the Earth. He said, 'A really big coaster.'",
    "What's a flat-earther's favorite TV show? Edge of the World, streaming live every day.",
    "Why did the flat-earther become a photographer? He wanted to focus on the horizon.",
    "Flat-earthers don't believe in global warming—they say it's just 'flat out hot!'",
    "How did the flat-earther react when I said Earth has poles? 'Poles are just vertical lies!'",
    "Why don't flat-earthers trust maps? They always look too shady around the edges.",
    "Flat-earthers think space exploration is fake because nobody's shown them a picture of the Earth from *below*.",
    "Flat-earthers are great at balancing budgets—they only work in straight lines!",
    "Why don't flat-earthers play golf? They're worried their ball might roll off the green.",
    "I asked a flat-earther for proof of their claims. He handed me a leveler and said, 'See? Perfectly flat!'",
    "Flat-earthers don't trust pilots—they think they're just circling us in loops.",
    "Why did the flat-earther open a bakery? To prove the Earth is as flat as his best bread.",
    "Flat-earthers believe the world is a giant pizza: no crust, just toppings.",
    "I told a flat-earther the Earth spins on an axis. He said, 'I didn't feel a thing!'",
    "What's a flat-earther's favorite vehicle? A hovercraft—no curves, just smooth sailing.",
    "Why did the flat-earther bring a ruler to the beach? To prove the horizon doesn't bend!",
    "What's a flat-earther's favorite sport? Table tennis—it's the only game that respects a flat surface.",
    "Why do flat-earthers avoid mountaintops? They say it's too 'edge-ucational.'",
    "Flat-earthers always win arguments: they keep their theories flat and simple.",
    "Why do flat-earthers hate globe-trotting? 'It's a roundabout way to see the world!'",
    "What does a flat-earther bring to a science fair? A pizza box labeled 'Earth Model.'",
    "Flat-earthers are the best at poker: they never play with curves, just straight faces."
]


@api_view(['GET'])
def generate_joke(request):
    joke = random.choice(jokes)
    return JsonResponse({"status": True, "joke": joke}, status=200)




def loginpost(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # Redirect to home or another page after successful login
        else:
            # Invalid login credentials
            return render(request, 'login.html', {'error': 'Invalid credentials'})
    return render(request, 'login.html')  # Return login form if method is not POST
