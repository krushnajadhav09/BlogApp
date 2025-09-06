from django.db import models
from datetime import date 
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.

class Blogs(models.Model):
    author=models.ForeignKey(User,on_delete=models.CASCADE , null=True)
    title = models.CharField(max_length=30 , null=True , blank=False)
    Description=models.CharField(max_length=300, null=True, blank=False)
    image = models.ImageField(upload_to="images/", blank=False, null=True)
    Type=models.CharField(max_length=100, choices=(('Food Blogs','Food Blogs'),
                                                   ('Lifestyle Blogs','Lifestyle Blogs'),
                                                   ('Technology Blogs','Technology Blogs'),
                                                   ('Education Blogs','Education Blogs'),
                                                   ('Business Blogs','Business Blogs'),
                                                   ('Creative Blogs','Creative Blogs'),
                                                   ('Hobbies Blogs','Hobbies Blogs'),
                                                   ('Personal Blogs','Personal Blogs'),
                                                   ('Social Blogs','Social Blogs')),
                                                   default='Personal Blogs')
    created_at = models.DateField(auto_now_add=True)
    updated_at=models.DateField(auto_now_add=True)
    
    @property
    def formatted_date(self):
        return self.created_at.strftime('%A, %d %b')
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True, blank=False)
    bio = models.TextField(blank=False , null=True)
    location = models.CharField(max_length=255, blank=False ,null=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=False)

class Comment(models.Model):
    blog = models.ForeignKey(Blogs, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    blog = models.ForeignKey(Blogs, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('blog', 'user')  # prevent duplicate likes
    def __str__(self):
        return self.user.username