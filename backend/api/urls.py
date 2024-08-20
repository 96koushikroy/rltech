from django.urls import path
from . import views

VERSION="v1"

urlpatterns = [
    path(f'api/{VERSION}/recipes', views.RecipeListView.as_view()),
]
