from django.shortcuts import render
from .serializers import BlogsSerializers
from rest_framework import generics
from .models import Blogs
# Create your views here.
class BlogscreateViews(generics.ListCreateAPIView):
    queryset=Blogs.objects.all()
    serializer_class=BlogsSerializers
 
class blogUpdateDeleteViews(generics.RetrieveUpdateDestroyAPIView):
    queryset=Blogs.objects.all()
    serializer_class=BlogsSerializers
        