from django.contrib import admin
from django.urls import path
from .views import BlogscreateViews,blogUpdateDeleteViews,register_user
urlpatterns = [
    path('blogs/',BlogscreateViews.as_view(), name="create_blogs"),
    path("blogs/<int:pk>/", blogUpdateDeleteViews.as_view(), name="update_delete_views"),
    path('blogs/register/',register_user , name="register_save")

]
