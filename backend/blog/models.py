from django.utils import timezone
from django.conf import settings
from django.db import models


# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
    

    ##### Changes to allow Discord auth details, Avatar, etc ##############################

class DiscordUser(models.Model):
    discord_id = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100)
    discriminator = models.CharField(max_length=4)
    avatar_url = models.URLField()

    def __str__(self):
        return f"{self.username}#{self.discriminator}"