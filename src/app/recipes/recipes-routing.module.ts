import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGaurd } from "../auth/auth.gaurd";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
  {
    //dont need to spicify '/recipe here'
    //we are loading the recipe route via
    //lazy loading in the 'app-routing.module.ts'
    //so essentailly we are starting at /recipe here
    path: '',
    component: RecipesComponent ,
    canActivate : [AuthGaurd],
    children: [
      {
        path: '', component: RecipeStartComponent
      },
      {
        path: 'new', component: RecipeEditComponent
      },
      {
        path: ':id', component: RecipeDetailComponent,
        resolve: [RecipeResolverService]
      },
      {
        path: ':id/edit', component: RecipeEditComponent,
        resolve: [RecipeResolverService]
      }
    ]
  }
];

@NgModule({
  imports : [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class RecipeRoutingModule{}
