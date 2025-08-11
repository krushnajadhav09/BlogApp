from django.db import models
from datetime import date 
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.

class Blogs(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    content=models.TextField(max_length=200,default='No content yet')
    Type=models.CharField(max_length=100, choices=(('important','important'),('personal','personal'),('bussiness','bussiness')), default='personal')
    created_at = models.DateField(auto_now=True)
    updated_at=models.DateField(auto_now=True)
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True, blank=True)
    bio = models.TextField(blank=True , null=True)
    location = models.CharField(max_length=255, blank=True ,null=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)

    def __str__(self):
        return self.user.username