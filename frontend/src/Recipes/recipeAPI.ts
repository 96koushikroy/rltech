import { Recipe } from "./Recipe";

const baseUrl = "http://localhost:8000";
const url = `${baseUrl}/api/v1/recipes`;

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the project(s).";
    default:
      return "There was an error retrieving the project(s). Please try again.";
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

function convertToRecipeModels(data: any[]): Recipe[] {
  let recipes: Recipe[] = data.map(convertToRecipeModel);
  return recipes;
}

function convertToRecipeModel(item: any): Recipe {
  const recipe = new Recipe();
  recipe.recipe_name = item.recipe_name;
  recipe.items = item.items;
  console.log(recipe);
  return recipe;
}

const recipeAPI = {
  get() {
    return fetch(`${url}/`)
      .then(checkStatus)
      .then(parseJSON)
      .then(convertToRecipeModels)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error retrieving the projects. Please try again."
        );
      });
  },
  post(recipe: Recipe) {
    return fetch(`${url}/`, {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error(
          "There was an error updating the project. Please try again."
        );
      });
  },
};

export { recipeAPI };
