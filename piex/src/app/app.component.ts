import {Component, OnInit} from '@angular/core';
import {UserLogin} from "./user/user.login";

@Component({
  selector: 'app-root',
  template: '<h1>Welcome Back {{user.first_name}}.</h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user: UserLogin;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
