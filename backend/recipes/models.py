from django.db import models
from django.utils.translation import gettext_lazy as _

# class Item(models.Model):
#     class Units(models.TextChoices):
#         LBS = "LBS", _("LBS")
#         TBSP = "TBSP", _("TBSP")
#         CUPS = "CUPS", _("CUPS")

#     name = models.CharField(max_length=200)
#     quantity = models.IntegerField(default=0) 
#     unit = models.CharField(max_length=5, choices=Units.choices)

# Create your models here.
class Recipe(models.Model):
    recipe_name = models.CharField(max_length=200)
    items = models.JSONField()