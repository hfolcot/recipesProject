import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Margherita Pizza',
      'A pizza made with four cheeses and a tomato base',
      'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Cheese', 2),
      ]
    ),
    new Recipe(
      'Pepperoni Pizza',
      'Pepperoni and cheese on a dough base',
      'https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      [
        new Ingredient('Bread', 1),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Cheese', 2),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
