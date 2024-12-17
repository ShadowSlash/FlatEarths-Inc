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
import openai

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
    discriminator = user_data['discriminator']

    # store user session or database entry
    request.session['discord_id'] = discord_id
    request.session['username'] = username
    request.session['discriminator'] = discriminator
    
    # now we need to get the profile pic
    avatar = user_data['avatar']
    pfp_url = f"https://cdn.discordapp.com/avatars/{discord_id}/{avatar}.png" # pretty sure thats correct 

    
    return redirect('/dashboard/')

'''# testing before adding real jokes or using a 3rd party api
jokes = [
    "testing, flat earth joke 1",
    "testing, flat earth joke 2",
    "testing, flat earth joke 3",
    "testing, flat earth joke 4",
    "testing, flat earth joke 5",
]
'''
openai.api_key = 'api key placeholder'

@api_view(['GET'])
def generate_joke(request):
    '''joke = random.choice(jokes)
    return Response({"status": True, "joke": joke})''' # this is the easy method
    # but we want to use a 3rd party api bc its cooler
    
    '''===================================================================================================================================='''
    
    '''response = requests.get("https://offical-joke-api.appspot.com/random_joke") # nvm this api is terrible, i'll leave this here incase we want to use it later
    
    if response.status_code == 200:
        data = response.json()
        joke = f"{data['setup']} - {data['punchline']}"
        
        # this is the magic that checks if its a flat earth joke
        if "flat" in joke.lower() or "earth" in joke.lower():
            return Response({"status": True, "joke": joke})
        else:
            return Response({"status": False, "message": f"Oops! a flat earth joke was not generated: {joke}. Try again!"})
    else:
        return Response({"status": False, "message": "Failed to fetch joke data"}, status = response.status_code)'''
        
    '''====================================================================================================================================='''
        
    response = openai.ChatCompletion.create(model = "gpt-3.5-turbo", messages = [{"role": "user", "content": "tell me a flat earth joke"}])
    joke = response['choices'][0]['message']['content']
    return Response({"status": True, "joke": joke})
    # now we're extra fancy using chatgpt :D
    
    
