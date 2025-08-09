from .models import Blogs
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
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
    
class customLoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField(write_only=True)
    
    def validate(self, data):
        username=data.get("username")
        password=data.get("password")
        
        user=authenticate(username=username,password=password)
        if not user:
            raise serializers.ValidationError("invalid username or password")
        refresh=RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }
