from rest_framework.response import Response
from rest_framework.request import Request
from .serializers import RecipeSerializer
from recipes.models import Recipe
from rest_framework.views import APIView
from rest_framework import status

# Create your views here.

class RecipeListView(APIView):
    serializer_class = RecipeSerializer

    def get(self, request: Request, *args, **kwargs):
        recipes = Recipe.objects.all()
        serializer = self.serializer_class(recipes, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request: Request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            response = {
                'data': serializer.data,
            }
            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data={"error": "Invalid Data."}, status=status.HTTP_400_BAD_REQUEST)

