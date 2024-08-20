export class Item {
  formItemName: string = "";
  formItemQty: number = 0;
  formUnit: string = "";
}

export class Recipe {
  recipe_name: string = "";
  items: Item[] = [];
}
