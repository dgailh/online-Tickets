import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import {map, catchError} from "rxjs/operators";
import {of} from "rxjs";
import {User} from "./User";
import {Ticket} from "./tickets/Ticket";
import {Response} from "../service/server.response";

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const API_ARGS = {headers: headers};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>( 'api/user/users').pipe(
      catchError(err => {
        console.log('Error! Did you forget to start the server', err);
        return of([])
      })
    )
  }

  getUser(user_id:number): Observable<User> {
    return this.http.get<User>('api/user/users/'+user_id);
  }

  addUser(user:any): Observable<User> {
    console.log(('api/user/create' + JSON.stringify(user) + API_ARGS));
    return this.http.post<User>('api/user/create', JSON.stringify(user), API_ARGS)
  }

  deleteUser(id:number) {
    return this.http.get('api/user/removeUser/'+id)

  }

  updateUser(user:any): Observable<User> {
    console.log(( 'api/user/updateUser'+ JSON.stringify(user)+API_ARGS))
    return this.http.put<User>('api/user/updateUser',user,API_ARGS)
  }

  userTickets(id:number): Observable<Ticket[]>{
    return this.http.get<Ticket[]>('api/tickets/userTickets/'+id).pipe(
      catchError(err => {
        console.log('Error! Did you forget to start the server', err);
        return of([])
      })
    )
  }
  deleteTicket(ticket_id:number): Observable<Response>{
    return this.http.get<Response>('api/tickets/removeTicket/'+ticket_id)
  }

  checkEmail(e: string){
    return this.http.get<Response>('api/user/email/'+e)
  }
}
