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
        path: 'shopping-list', component: ShoppingListComponent
      }
    ])
  ]
})

export class ShoppingListModule{

}
