import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStoreService: DataStorageService,
              private authService: AuthService){}


  ngOnInit(){

    //if we have a user then we are logged in, that is the core
    //idea, if no user than we are not logged in
    this.userSub = this.authService.user.subscribe( user =>{
        this.isAuthenticated = !user ? false : true;
    });
  }

  onSave(){

    this.dataStoreService.storeRecipe();

  }

  onFetch(){
    this.dataStoreService.fetchRecipe().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }


}
