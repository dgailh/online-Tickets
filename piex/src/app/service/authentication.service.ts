import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../user/User";
import {Router} from "@angular/router";
import {UserLogin} from "../user/user.login";



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public currentUser: Observable<UserLogin>;
   currentUser:UserLogin;

  constructor(private http: HttpClient,private Router: Router,) {
  }

  login(email: string, password: string) {
    return this.http.post<any>(`/api/user/login`, {email, password})
      .pipe(map(user => {
        if (user) {
          user.authdata = btoa(`${email}:${password}`);
          localStorage.setItem('currentUser', JSON.stringify(user));
          location.reload();
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUser= null;
    this.Router.navigate(['/login']);

  }

  getRole(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.currentUser.userRole;
  }
}
