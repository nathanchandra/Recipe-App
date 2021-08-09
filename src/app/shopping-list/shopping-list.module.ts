import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";


@NgModule({
  declarations : [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports : [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        //removed path as we are lazy loading this
        path: '', component: ShoppingListComponent
      }
    ])
  ]
})

export class ShoppingListModule{

}
