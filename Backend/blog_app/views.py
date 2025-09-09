from django.shortcuts import render
from .serializers import BlogsSerializers,Registration,customLoginSerializer,ProfileSerializer,CommentSerializer
from rest_framework import generics,permissions,filters
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Blogs,Profile,Comment
from .permissions import IsOwnerOrReadOnly
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView 

# Create your views here.
class BlogscreateViews(generics.ListCreateAPIView):
    queryset=Blogs.objects.all().order_by('-created_at')
    serializer_class=BlogsSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends=[filters.SearchFilter]
    search_fields=['Type']
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)  # a
class blogUpdateDeleteViews(generics.RetrieveUpdateDestroyAPIView):
    queryset=Blogs.objects.all()
    serializer_class=BlogsSerializers
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

        
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

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CommentCreateListView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        blog_id = self.kwargs['blog_id']
        return Comment.objects.filter(blog_id=blog_id).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)        

class ToggleLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, blog_id):
        blog = Blogs.objects.get(id=blog_id)
        like, created = Like.objects.get_or_create(blog=blog, user=request.user)

        if not created:
            like.delete()
            return Response({"message": "Unliked"})
        return Response({"message": "Liked"})
        
        