from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Recipe(models.Model):
    recipe_name = models.CharField(max_length=200)
    items = models.JSONField()