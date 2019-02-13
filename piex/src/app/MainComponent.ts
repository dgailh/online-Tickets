import {Component, OnInit} from '@angular/core';
import {UserLogin} from "./user/user.login";

@Component({
  selector: 'app-main',
  template: `
    <div class="container-fluid">
    <h1>Events Management Home </h1>
		<a routerLink="/home" class="btn btn-primary">Home</a>-
    <a routerLink="/users" class="btn btn-primary">User List</a>-
    <a routerLink="/register" class="btn btn-primary">Register</a>-
      <a routerLink="/login" class="btn btn-primary">login</a>-
      <a routerLink="/events" class="btn btn-primary">events</a>-
      <a *ngIf="isAdmin()" routerLink="/admin/events" class="btn btn-primary">Admin</a>
    <hr>
		<router-outlet></router-outlet>
    <hr >
    <div class="text-sm-center"> © 2018 Abdullah Al-Omari Rights Reserved</div>
    </div>
  `
})
export class MainComponent implements OnInit {
  loggedUser: UserLogin;

  constructor() {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));

  }
  ngOnInit() {

  }
  isAdmin(){
    if (this.loggedUser.userRole =='admin')
      return true;
    else
      return false;
  }
}
