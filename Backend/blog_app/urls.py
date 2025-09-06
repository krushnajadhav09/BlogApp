from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import BlogscreateViews,blogUpdateDeleteViews,register_user,login_user,ProfileView,LogoutView,CommentCreateListView,ToggleLikeView
urlpatterns = [
    path('blogs/',BlogscreateViews.as_view(), name="create_blogs"),
    path("blogs/<int:pk>/", blogUpdateDeleteViews.as_view(), name="update_delete_views"),
    path('register/',register_user , name="register_save"),
    path('login/',login_user , name="login"),
    path('profile/',ProfileView.as_view() ,name="profile" ),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('blogs/<int:blog_id>/comments/', CommentCreateListView.as_view(), name='blog-comments'),
    path('blogs/<int:blog_id>/like/', ToggleLikeView.as_view(), name='toggle-like'),
     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),



]
