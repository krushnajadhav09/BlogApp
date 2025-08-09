from django.contrib import admin
from django.urls import path
from .views import BlogscreateViews,blogUpdateDeleteViews
urlpatterns = [
    path('blogs/',BlogscreateViews.as_view(), name="create_blogs"),
    path("blogs/<int:pk>/", blogUpdateDeleteViews.as_view(), name="update_delete_views")
]
