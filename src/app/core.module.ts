import { ShoppingListService } from './shopping-list/shopping-list.service';
import { NgModule } from "@angular/core";
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


//this is not working I don't know why
//need to figure out later

@NgModule({
  //you do not need to export services
  //as they work different, only declrations
  //and other modules need to be exported,
  //services are automatically injected on a
  //root level
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})

export class CoreModule{}
