from django.db import models
from datetime import date 
# Create your models here.

class Blogs(models.Model):
    image = models.ImageField(upload_to="images/", blank=True, null=True)
    content=models.TextField(max_length=200,default='No content yet')
    Type=models.CharField(max_length=100, choices=(('important','important'),('personal','personal'),('bussiness','bussiness')), default='personal')
    created_at = models.DateField(auto_now=True)
    updated_at=models.DateField(auto_now=True)