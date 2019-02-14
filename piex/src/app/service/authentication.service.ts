import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../user/User";
import {Router} from "@angular/router";



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,private Router: Router,) {
  }

  login(email: string, password: string) {
    let header= new HttpHeaders();
    header = header.append('Authorization','Basic '+btoa(`${email}:${password}`))
    return this.http.get<any>(`/api/user/login`, { headers: header})
      .pipe(map(user => {
        // login successful if there's token in the response
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
    this.Router.navigate(['/login']);

  }
}
