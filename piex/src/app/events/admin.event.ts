import {Component, OnInit} from "@angular/core";
import {eventService} from "./eventService";
import {UserLogin} from "../user/user.login";
import {Event} from "./Event";
import { NgFlashMessageService } from 'ng-flash-messages';

@Component(
  {
    selector: 'admin-event',
    templateUrl: './admin.event.html'
  }
)

export class AdminEvent implements OnInit{
  currentUser: UserLogin;
  events$ : Event[];

  constructor(private eventService: eventService){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }
  ngOnInit(): void {


    this.getEvents();
  }
  getEvents(){
    this.eventService.getEventsAdmin().subscribe(

      eventData => {

        this.events$ = eventData;
      },
      err => console.log(err),
      () => console.log('Getting events complete...')
    );
  };

  approveEvent(event_id:number){
    this.eventService.approveEvent(event_id).subscribe()
  }

  disapproveEvent(event_id:number){
    this.eventService.approveEvent(event_id).subscribe()
  }
}
