import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

//A route gaurd allows us to run logic right
//before a gaurd is loaded and we can grant
//or deny access based on different conditions
@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean | UrlTree>{

      //this return an observale of type bool
      return this.authService.user.pipe(
        take(1),
        map( user => {
        //return !!user;
        const isAuth = !!user;
        if(isAuth){
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      }));
  }

}
