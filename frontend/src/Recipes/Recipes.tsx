import Container from "react-bootstrap/Container";
import AddRecipe from "./AddRecipe";
import { useEffect, useState } from "react";
import { Recipe } from "./Recipe";
import RecipeList from "./RecipeList";
import { recipeAPI } from "./recipeAPI";
import { toast } from "react-toastify";

export default function RecipesPage() {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await recipeAPI.get()
        setRecipeList(response)
      } catch (error: any) {
        toast.error(error.message)
      }

    }
    fetchUserData()
  },[])

  return (
    <>
      <Container className="mt-4">
        <h1 className="text-center">Simple Food Recipe Tracking App</h1>
        <br />
        <AddRecipe addRecipeList={setRecipeList} />
        <RecipeList recipes={recipeList}></RecipeList>
      </Container>
    </>
  );
}
