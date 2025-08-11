from django.shortcuts import render
from .serializers import BlogsSerializers,Registration,customLoginSerializer,ProfileSerializer
from rest_framework import generics,permissions
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Blogs,Profile
# Create your views here.
class BlogscreateViews(generics.ListCreateAPIView):
    queryset=Blogs.objects.all()
    serializer_class=BlogsSerializers
 
class blogUpdateDeleteViews(generics.RetrieveUpdateDestroyAPIView):
    queryset=Blogs.objects.all()
    serializer_class=BlogsSerializers
        
@api_view(['POST'])
def register_user(request):
    serializers=Registration(data=request.data)
    print(serializers)
    if serializers.is_valid():
        serializers.save()
        # print(new_user.email)
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)        
        
@api_view(['POST'])
def login_user(request):
    serializer=customLoginSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.validated_data,status=status.HTTP_200_OK)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)        

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Ensure profile exists for logged-in user
        profile, created = Profile.objects.get_or_create(user=self.request.user)
        return profile

