import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Event} from "./Event";
import {UserLogin} from "../user/user.login";
import {AlertService} from "../service/alert.service";
import {EventService} from "./eventService";


@Component(
  {
    selector: 'app-event',
    templateUrl: 'event.component.html'
  }
)

export class EventComponent implements OnInit,OnDestroy {
  events$ : Event[];
  showDetails;
  isAdmin;
  isOrganizer;
  currentEvent: Event;
  loggedUser: UserLogin;
  isGuest: boolean;
  prevId : number;

  constructor(private Router: Router,
              private flashMSG:AlertService ,private route: ActivatedRoute,
              private eventService:EventService){

    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.loggedUser) {//
      if (this.loggedUser.userRole == "admin")
        this.isAdmin = true;
      if (this.loggedUser.userRole == "organizer")
        this.isOrganizer = true;
    }
    else
      this.isGuest = true;
  }

  ngOnInit(): void {
    this.getEvents();
  }
  getEvents(){
    this.eventService.getEvents().subscribe(

      eventData => {

        this.events$ = eventData;
      },
      err => console.log(err),
      () => console.log('Getting events complete...')
    );
  };

  //if to show the extra details
  advanceEvent(event_id : number){
    this.Router.navigate(['/events/event',{id: event_id}]);
  }

  bookATicket(eventID :number ){
     if (this.isGuest){
       this.Router.navigate(['/login']);
     }

    this.eventService.bookATicket(this.loggedUser.userId,eventID).subscribe(
      action => {
        this.flashMSG.flashMSG(action.text,action.responseIndicator);
      },
      err => console.log(err),
      () => console.log('booking a ticket...')
    )
  }


  deleteEvent(event_id:number){
    this.eventService.deleteEvent(event_id).subscribe( action =>{

        this.flashMSG.flashMSG(action.text,action.responseIndicator);
        this.getEvents();
      },
      err => console.log(err),
      () => console.log('removing the event...')
    )
  }

  searchByCity(city: string){
    //this.events$ = this.events$.
  }

  searchByDate(event_date: Date){

  }

  ngOnDestroy(): void {

  }
}
