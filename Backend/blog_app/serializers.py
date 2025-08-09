from .models import Blogs
from rest_framework import serializers
from django.contrib.auth.models import User

class BlogsSerializers(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta():
        model=Blogs
        fields='__all__'

class Registration(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)        
    password2=serializers.CharField(write_only=True)    
    
    class Meta():
        model=User
        fields=['username','email','password','password2']
        
    def validation(self,data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('password do not match') 
        return data
    def create(self,validated_data):
        validated_data.pop('password2')
        user=User.objects.create_user(**validated_data)
        return user       
    
