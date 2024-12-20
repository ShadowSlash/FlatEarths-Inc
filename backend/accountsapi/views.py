from accountsapi.serializers import EmailOtpLoginSerializer, LoginSerializer, ProfileSerializer, RegisterSerializer

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view

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

@swagger_auto_schema(method='post',request_body=LoginSerializer)
@api_view(['POST'])
def loginpost(request):
    serializer = LoginSerializer(data = request.data)
    if not serializer.is_valid():
        return Response({
            "status": False,
            "data": serializer.errors
        })
    username = serializer.data['username']
    password = serializer.data['password']

    user = User.objects.filter(username=username).first()
    # if user and user.check_password(password):
    #     return Response({
    #         "status": True,
    #         "data": {'token' : str(Token.objects.get_or_create(user=user)[0].key)}
    #     })
    user_obj = authenticate(username=username, password=password)
    user_data = {
        "id": user.id,
        "name": f"{user.first_name} {user.last_name}".strip() if user.first_name or user.last_name else user.username,
        "token": str(Token.objects.get_or_create(user=user_obj)[0].key),
    }
    if user_obj:
        return Response({
            "status": True,
            "data": user_data
        })

    return Response({
        "status": True,
        "data": {},
        "message": "Invalid Credentials"
    })


class RegisterView(APIView):
    @swagger_auto_schema(request_body=RegisterSerializer)
    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            user_data = {
                "id": user.id,
                "username": user.username,
                "email" : getattr(user, "email", "")
            }
            return Response({
                "status": True,
                "message": "User Created Successfully",
                "data" : user_data
            }, status= status.HTTP_201_CREATED)
        return Response({
            "status": False,
            "message": serializer.errors
        }, status= status.HTTP_400_BAD_REQUEST)
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = ProfileSerializer(user)
        print(serializer.data)
        return Response({
            "status": True,
            "data": serializer.data
        })


# OTP-based Auth
# Step 1: Generate OTP for the given email
# @swagger_auto_schema(method='post', request_body=openapi.Schema(type='object', properties={'email': openapi.Schema(type='string', format='email')}, required=['email']))
@api_view(['PUT'])
def generate_otp_for_email(request, email):
    # email = request.data.get("email")

    if not email:
        return Response({
            "status": False,
            "message": "Email is required"
        }, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({
            "status": False,
            "message": "User not found"
        }, status=404)

    # Generate OTP and send it to the email
    otp = generate_otp(email)
    
    return Response({
        "status": True,
        "message": f"The otp for user is user {user.username} is {otp}"
    }, status=200)


# Step 2: Verify OTP entered by the user
@swagger_auto_schema(method='post', request_body=EmailOtpLoginSerializer)
@api_view(['POST'])
def verify_otp_login(request):
    email = request.data.get("email")
    otp_provided = request.data.get("otp")

    if not email or not otp_provided:
        return Response({
            "status": False,
            "message": "Email and OTP are required"
        }, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({
            "status": False,
            "message": "User not found"
        }, status=404)

    # Validate the OTP here
    totp = pyotp.TOTP('base32secret3232')  # Should be same secret used for generating OTP
    if totp.verify(otp_provided):  # Check if the provided OTP matches
        # Successful login, return token
        token = str(Token.objects.get_or_create(user=user)[0].key)
        return Response({
            "status": True,
            "message": "Login successful",
            "data": {"token": token}
        })
    else:
        return Response({
            "status": False,
            "message": "Invalid OTP"
        }, status=400)
        
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



####################################### Discord oauth2 functions#######################################################

import requests
from django.conf import settings
from django.shortcuts import redirect
from django.http import JsonResponse

import requests
from django.conf import settings
from django.shortcuts import redirect
from django.http import JsonResponse

def discord_callback(request):
    # Get the authorization code from the URL query parameters
    code = request.GET.get('code')
    
    if not code:
        # If there's no code, redirect to login or handle the error
        return redirect('http://localhost:5173/dashboard/login')  # Frontend login page (React app)

    # Exchange the code for an access token
    token_url = 'https://discord.com/api/oauth2/token'
    data = {
        'client_id': settings.DISCORD_CLIENT_ID,
        'client_secret': settings.DISCORD_CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': settings.DISCORD_REDIRECT_URI,
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    # Send request to Discord's token endpoint
    response = requests.post(token_url, data=data, headers=headers)
    response_data = response.json()
    
    if 'access_token' in response_data:
        access_token = response_data['access_token']
        
        # Fetch user information from Discord using the access token
        user_info_url = 'https://discord.com/api/v10/users/@me'
        user_headers = {
            'Authorization': f'Bearer {access_token}'
        }
        user_response = requests.get(user_info_url, headers=user_headers)
        user_data = user_response.json()
        
        # Get the user's Discord username and avatar
        discord_username = user_data.get('username')
        discord_avatar = user_data.get('avatar')
        
        # You can optionally save this user data in the database or create a new user
        
        # Construct the URL for the user's avatar (Discord avatar URLs are dynamic)
        avatar_url = f'https://cdn.discordapp.com/avatars/{user_data["id"]}/{discord_avatar}.png' if discord_avatar else None
        
        # Redirect back to the React app (your frontend) with the access token, username, and avatar URL
        return redirect(f'http://localhost:5173/dashboard?token={access_token}&username={discord_username}&avatar={avatar_url}')
    
    else:
        # If the access token is missing or invalid, redirect to the login page on the frontend
        return redirect('http://localhost:5173/dashboard/login')

    

# views.py


    
