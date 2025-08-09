from django.contrib import admin
from django.urls import path
from .views import BlogscreateViews
urlpatterns = [
    path('blogs/',BlogscreateViews.as_view(), name="create_blogs")
]
