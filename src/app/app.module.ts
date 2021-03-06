import { RecipeService } from './recipes/recipe.service';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthInterceptor } from './auth/auth-interceptor.service';

@NgModule({
  //array of components, directives, pipes etc
  //must be declared here else we canot use them
  //in our templates or routes

  //modules can only be declared at one place
  //within your app, this is important to know
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  //imports array allows us import
  //other modules into this module
  //anything you need in an template needs
  //to imported here, angular functionality
  //such an ngIf, ngFor, formGroup etc etc
  imports: [
    //theses modules ship with angular
    BrowserModule, //Browser module should only be used in one component
    HttpClientModule,
    //our own custom modules
    AppRoutingModule,
    //dont need Recipes, shopping, and auth Module as we are
    //lazy loading it
    //RecipesModule,
    //ShoppingListModule,
    //AuthModule,
    SharedModule

  ],
  //he we define all the services we
  //we want to provide to the app
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  //the bootstrap array is important
  //for starting our app, it tells us
  //which component is available in the
  //index.html template, typically you
  //only have 1 component
  bootstrap: [AppComponent]
})
export class AppModule { }
