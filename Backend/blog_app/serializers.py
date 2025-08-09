from .models import Blogs
from rest_framework import serializers

class BlogsSerializers(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta():
        model=Blogs
        fields='__all__'