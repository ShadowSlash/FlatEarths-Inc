from django.urls import path
from accountsapi.views import loginpost, RegisterView , ProfileView, generate_otp_for_email,verify_otp_login
from . import views

urlpatterns = [
    path('login', loginpost, name='login_post'),
    path('signup', RegisterView.as_view()),
    path('profile', ProfileView.as_view()),
#     path('generate-otp/<str:email>/', generate_otp_for_email, name='generate_otp'),
    path('verify-otp-login', verify_otp_login, name='verify_otp_login'),
#     path('discord/login/', views.discord_login, name='discord_login'),
#     path('discord/api/v1/callback/', views.discord_callback, name='discord_callback'),
]