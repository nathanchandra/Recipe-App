import { AuthResponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {

  isLogginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router : Router){

  }

  onSwitchMode(){
    this.isLogginMode = !this.isLogginMode;
  }

  onSubmit(form: NgForm){
    //console.log(form.value);

    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObz: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLogginMode){

      authObz = this.authService.signIn(email, password);

    }else {
      authObz = this.authService.signUp(email, password);
    }

    authObz.subscribe(
      responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );


    form.reset();
  }

}
