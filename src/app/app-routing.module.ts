import { AuthComponent } from './auth/auth.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  //we need to export this module so we can
  //import and use it in our AppModule
  exports: [RouterModule]
})

export class AppRoutingModule{

}
