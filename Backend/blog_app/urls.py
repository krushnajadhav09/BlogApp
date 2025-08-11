from django.contrib import admin
from django.urls import path
from .views import BlogscreateViews,blogUpdateDeleteViews,register_user,login_user,ProfileView
urlpatterns = [
    path('blogs/',BlogscreateViews.as_view(), name="create_blogs"),
    path("blogs/<int:pk>/", blogUpdateDeleteViews.as_view(), name="update_delete_views"),
    path('register/',register_user , name="register_save"),
    path('login/',login_user , name="login"),
    path('profile/',ProfileView.as_view() ,name="profile" )

]
