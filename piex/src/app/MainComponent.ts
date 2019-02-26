import {Component, OnInit} from '@angular/core';
import {UserLogin} from "./user/user.login";
import {AuthenticationService} from "./service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
   templateUrl: './MainComponent.html'
  // template: `
  //   <div class="container-fluid">
  //   <h1>Events Management Home </h1>
	// 	<a routerLink="/home" class="btn btn-primary">Home</a>-
  //   <a routerLink="/users" class="btn btn-primary">User List</a>-
  //   <a routerLink="/register" class="btn btn-primary">Register</a>-
  //     <a routerLink="/login" class="btn btn-primary">login</a>-
  //     <a routerLink="/events" class="btn btn-primary">events</a>-
  //     <a *ngIf="isAdmin()" routerLink="/admin/events" class="btn btn-primary">Admin</a>-
  //     <button  (click)="logout()">Sign Out</button>
  //   <hr>
	// 	<router-outlet></router-outlet>
  //   <hr >
  //   <div class="text-sm-center"> © 2018 Abdullah Al-Omari Rights Reserved</div>
  //   </div>
  // `
})
export class MainComponent implements OnInit {
  loggedUser: UserLogin;

  constructor(private authenticationService: AuthenticationService,private router: Router) {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));

  }
  ngOnInit() {

  }
  isAdmin(){
    if (this.loggedUser)
    if (this.loggedUser.userRole =='admin')
      return true;
    else
      return false;
  }

  logout(){
    this.authenticationService.logout();
  }
  login(){
    this.router.navigate(["/login"])
  }
}
