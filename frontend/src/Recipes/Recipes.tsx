import Container from "react-bootstrap/Container";
import AddRecipe from "./AddRecipe";
import { useState } from "react";
import { Recipe } from "./Recipe";

export default function RecipesPage() {
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  return (
    <>
      <Container className="mt-4">
        <h1 className="text-center">Simple Food Recipe Tracking App</h1>
        <br />
        <AddRecipe addRecipeList={setRecipeList} />
      </Container>
    </>
  );
}
