import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { pipe } from 'rxjs';


@Injectable({providedIn: 'root'})
export class DataStorageService{

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService){}

  storeRecipe(){
    const recipes = this.recipeService.getRecipes();
    this.http
        .put('https://recipe-app-backend-cc21f-default-rtdb.firebaseio.com/recipes.json',
                recipes
              ).subscribe( response => {
              console.log(response);
              });
  }

  fetchRecipe(){

      return this.http
          .get<Recipe[]>('https://recipe-app-backend-cc21f-default-rtdb.firebaseio.com/recipes.json'
        )
        //this map function allows us to transform
        //observable data right before subscribe
        .pipe(map(recipe => {
          //this is the JS array map method different
          //from the prior mapp method, the prior is
          //a rxjs operator called as a function inside
          //of pipe and the later is invoked on an array
          return recipe.map( recipe => {
          //copying the recipe object via spread operator
          //checking if the ingredients array is present
          //if not adding an empty array
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          });
        }),tap(
            //tap operator allows us to excute some code here
            //without altering the data that is funnelled through
            //the observale/subscription
            recipes => {
            this.recipeService.setrecipes(recipes);
        }));
  }

}
