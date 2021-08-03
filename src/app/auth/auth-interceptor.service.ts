import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, take } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService){}

  //the take operator from rxjs gives us the ability
      //to take only 1 value (or howver many specifed) from
      //that observable and after that it will automatically
      //unsubscribe


       //exhaustMap waits for the first observable (in this case user)
      //than after in exhaust map we get the result of prior
      //observable, now we return a new observable in there which will
      //than replace the previous observable in that chain

             //this observable will now be the result of this observable
          //due to exhaustmap

  intercept(req: HttpRequest<any>, next: HttpHandler){

    return this.authService.user.pipe(
      take(1),
      exhaustMap( user => {

        if(!user){
          return next.handle(req);
        }

        const modififedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
          return next.handle(modififedReq);
      })
    );


  }

}
