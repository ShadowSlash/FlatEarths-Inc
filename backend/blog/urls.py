'''from django.urls import path

from blog import views
from . import views


urlpatterns = [
    path('login', views.loginpost, name='login_post'),
    path('signup', views.RegisterView.as_view()),
    path('profile', views.ProfileView.as_view()),
    path('generate-otp/<str:email>/', views.generate_otp_for_email, name='generate_otp'),
    path('verify-otp-login', views.verify_otp_login, name='verify_otp_login'),
    path('discord/login/', views.discord_login, name='discord_login'),
    path('discord/api/v1/callback/', views.discord_callback, name='discord_callback'),
    path('generate-joke/', views.generate_joke, name='generate_joke'),
]
'''
from django.urls import path

from blog import views

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('post/<int:id>/', views.post_detail, name='post_detail'),
    path('post/new/', views.post_new, name='post_new'),
    path('post/<int:id>/edit/', views.post_edit, name='post_edit'),
]