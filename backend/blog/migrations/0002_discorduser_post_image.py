# Generated by Django 5.1.2 on 2024-12-21 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscordUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('discord_id', models.CharField(max_length=100, unique=True)),
                ('username', models.CharField(max_length=100)),
                ('discriminator', models.CharField(max_length=4)),
                ('avatar_url', models.URLField()),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
