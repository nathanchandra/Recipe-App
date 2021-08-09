import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject} from 'rxjs' ;
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

//defining an interface for the repsonse data
//we are expecting from the backend
export interface AuthResponseData{
  kind : string,
  idToken : string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  //question mark signifies that this is
  //for for login repsonse not sign up response
  registerd? : boolean
}

@Injectable ({ providedIn: 'root'})
export class AuthService {

  //behaviour subject acts differently to subject
  //that it gives access to the previously emmited
  //value also
  user = new BehaviorSubject<User>(null);

  private tokenTimer : any;


  constructor(private http: HttpClient,
              private router : Router){

  }

  //a method that will try automatically login
  //when application starts, bu chekcing local storage
  //and seeing if there is a snapshot of user data
  autoLogin(){

    const userData : {
      email: string,
      id : string,
      _token : string,
      _tokenExpirationDate : string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser);
    }


  }


  autoLogout(expirationDuration : number){

    // //receive expirationDuration in milli sec FYI
    // this.tokenTimer = setTimeout(() => {
    //   this.logout();
    // }, expirationDuration);

    // console.log("Session expires in " + expirationDuration + " seconds");
  }

  logout(){
    //returning user subject back to initial state
    //when logout is clicked
    this.user.next(null);
    this.router.navigate(['/auth']);

    //clearing local storage
    localStorage.removeItem('userData');

    //if we've lgged out need to clear the timer,
    //else it will keep running over and over
    if(this.tokenTimer){
      clearTimeout(this.tokenTimer);
    }
  }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIkey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  signIn(email:string, password: string){

    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIkey,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }

    ).pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));

  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn : number){

    const expirationdate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User
      (email,
      userId,
      token,
      expirationdate);

    //emmiting our currently logged in user
    this.user.next(user);

    //one a user has logged in start logout timer
   //this.autoLogout(expiresIn * 1000);

    //storing our user data in local storage
    //allows us to write to the local storage
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){

    let errorMessage = 'An unknown error occured';

    //if errror response has no error key or no
    //nested error key than we know we dont have
    //much information to access
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }

    switch(errorRes.error.error.message){
        case 'EMAIL_NOT_FOUND':
          errorMessage = "this user does not exist";
        case 'EMAIL_EXISTS':
          errorMessage = "this email already exists";
        case 'INVALID_PASSWORD':
          errorMessage = "The password is invalid";
    }

    return throwError(errorMessage);

  }

}
