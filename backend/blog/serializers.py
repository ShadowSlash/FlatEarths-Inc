# blog/serializers.py
from rest_framework import serializers
from .models import Post


#############Post Serializer for the leftSidebar dynamic posts #####################################################################
class PostSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="post-detail", lookup_field='id')
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', 'title', 'name', 'published_date', 'text','image_url', 'url']  # Ensure these fields are serialized


    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url  # Returns the URL of the uploaded image
        return None

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        ref_name = 'BlogPostSerializer'  # Add a custom ref_name here


##################Discord Auth serialiszer 
from .models import DiscordUser

class DiscordUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscordUser
        fields = ['discord_id', 'username', 'discriminator', 'avatar_url']
