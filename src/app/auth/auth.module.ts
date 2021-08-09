import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports : [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
    {
      //removed path here as we are using lazy loading
      path: '', component: AuthComponent
    }]),
    SharedModule
  ]
})
export class AuthModule{}
