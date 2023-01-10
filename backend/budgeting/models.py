from django.db import models

class Budget(models.Model):
    amount = models.CharField(max_length=100)
    detail = models.CharField(max_length=200)
    type = models.CharField(max_length=100)
    addedat= models.CharField(max_length=100, default='String')
    
    

