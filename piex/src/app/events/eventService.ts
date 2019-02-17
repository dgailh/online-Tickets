import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

import { catchError} from "rxjs/operators";
import {of} from "rxjs";
import {Event} from "./Event";
import {Response} from "../service/server.response";

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const API_ARGS = {headers: headers};

@Injectable()
export class eventService{

  constructor(private http: HttpClient) {
  }

  getEvents(): Observable<Event[]>{

    return this.http.get<Event[]>('api/event/events').pipe(
      catchError(err => {
        console.log('Error! Cant reach the server!', err);
        return of([])
      })
    )
  }

  getEventsAdmin(): Observable<Event[]>{

    return this.http.get<Event[]>('api/event/events/admin').pipe(
      catchError(err => {
        console.log('Error! Cant reach the server!', err);
        return of([])
      })
    )
  }


  bookATicket(userID:number,eventID:number): Observable<Response>{
     return this.http.get<Response>('api/tickets/createTicket/'+userID+'/'+eventID);
  }

  deleteEvent(event_id:number): Observable<Response>{
    return this.http.get<Response>('api/event/removeEvent/'+event_id)
  }

  addEvent(event : any):Observable<Response> {
    console.log(('api/event/createEvent' + JSON.stringify(event) + API_ARGS));
    return this.http.post<Response>('api/event/createEvent', JSON.stringify(event), API_ARGS)
  }

  approveEvent(event_id:number): Observable<Response>{
    return this.http.get<Response>('api/event/approveEvent/'+event_id)
  }

  disapproveEvent(event_id:number): Observable<Response>{
    return this.http.get<Response>('api/event/disapproveEvent/'+event_id)
  }

  getSingleEvent(event_id:number): Observable<Event>{
    return this.http.get<Event>('api/event/events/'+event_id)
  }


}
