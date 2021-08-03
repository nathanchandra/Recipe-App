import { AlertComponent } from './../shared/alert/alert.component';
import { AuthResponseData, AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component ({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy {

  isLogginMode = true;
  isLoading = false;
  error: string = null;

  //@ViewChild will go an find the first instance of
  //that directive in the DOM
  @ViewChild(PlaceholderDirective , {static:false}) alertHost : PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router : Router,
              private componentFactoryResolver : ComponentFactoryResolver){

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
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );


    form.reset();
  }

  //condition for displaying error will be removed
  //and thus the alert box's condition for shwoing will
  //now be false and will be removed
  onCloseError(){
    this.error = null;
  }

  //programmatic approach to showing error alert
  //dynamically creating a component in code
  private showErrorAlert(message : string){

    //creating a component factory
    const alertComponentfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    //creating a veiwcontainer reference, which you get access to
    //using a helper directive
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    //use the reference to dynamically create a component with angualr 
    const componentRef = hostViewContainerRef.createComponent(alertComponentfactory);

    componentRef.instance.message = message;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

}
