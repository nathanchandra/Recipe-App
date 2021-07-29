import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

//A resolver runs before a route is loaded
//to ensure that some data that code depends
//on is available before excuting

@Injectable({ providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService:DataStorageService,
                private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

      const recipes = this.recipeService.getRecipes();

      if(recipes.length === 0){
        return this.dataStorageService.fetchRecipe();
      } else {
        return recipes;
      }



    }

}
