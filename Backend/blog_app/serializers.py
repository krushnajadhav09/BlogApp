from .models import Blogs,Profile
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class BlogsSerializers(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta():
        model=Blogs
        fields='__all__'

class Registration(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)        
    password2=serializers.CharField(write_only=True)    
    
    class Meta():
        model=User
        fields=['first_name','last_name','username','email','password','password2']
        
    def validate(self,data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError('password do not match') 
        return data
    def create(self,validated_data):
        validated_data.pop('password2')
        user=User.objects.create_user(**validated_data)
        return user       
    def validate_username(self,value):
        value=value.strip()
        if ' ' in value:
            raise serializers.ValidationError('username space is no allowed in username')
        if len(value) < 4:
            raise serializers.ValidationError("username username  must be atleast 4 charater long")
        return value      
    
    def validate_email(self,value):
        value=value.strip()
        if not value.endswith('@gmail.com'):
            raise serializers.ValidationError("email must be end with @gmail.com ")
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(" this email is alredy use in registration")
        return value
    def validate_first_name(self,value):
        value=value.strip()
        if len(value) < 3:
            raise serializers.ValidationError("first name must be more than 3 character")
        return value
    def validate_last_name(self,value):
        value=value.strip()
        if len(value) < 3:
            raise serializers.ValidationError("last name must be more than 3 character")
        return value
    def validate_passwor(self,value):
        if len(value)< 5: 
            raise serializers.ValidationError("password is must be 5 include  character")
        return value
class customLoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField(write_only=True)
    
    def validate(self, data):
        username=data.get("username").strip()
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
                "first_name":user.first_name,
                "last_name" :user.last_name,
                "username": user.username,
                "email": user.email
                
            }
        }

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model=Profile
        fields=['id','username','bio', 'profile_picture', 'location', 'birth_date']
