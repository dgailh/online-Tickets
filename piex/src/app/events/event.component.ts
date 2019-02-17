import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {eventService} from "./eventService";
import {Event} from "./Event";
import {UserLogin} from "../user/user.login";
import {AlertService} from "../service/alert.service";


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
              private eventService: eventService){

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
  advanceEvent(event : Event){
    this.Router.navigate(['/events/event',{id: event.id}]);
    if (this.showDetails == true && event.id == this.prevId) {
      this.showDetails = false;
      this.currentEvent = null;
      this.prevId = null;
    }
    else if (this.showDetails == true){
      this.showDetails = true;
      this.currentEvent = event;
      this.prevId = this.currentEvent.id;}
      else {
        this.showDetails= true;
        this.currentEvent = event;
        this.prevId = this.currentEvent.id;
      }
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

  ngOnDestroy(): void {

}}
