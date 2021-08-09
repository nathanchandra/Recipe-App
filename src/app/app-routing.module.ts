import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    //lazy loading,
    //only load these routes when user visits the recipe paths
    path: 'recipes' ,
    loadChildren:'./recipes/recipes.module#RecipesModule'
  },
  {
    path: 'shopping-list',
    loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {
        //will pre load the bundles as soon as
        //so they are available when we need them
        //decreasing load times
        preloadingStrategy : PreloadAllModules
      }),
  ],
  //we need to export this module so we can
  //import and use it in our AppModule
  exports: [RouterModule]
})

export class AppRoutingModule{

}
