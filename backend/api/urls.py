from django.urls import path
from . import views

urlpatterns = [
    path('recipes/', views.RecipeListView.as_view()),
]
