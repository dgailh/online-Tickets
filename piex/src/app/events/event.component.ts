import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {eventService} from "./eventService";
import {Event} from "./Event";
import { NgFlashMessageService } from 'ng-flash-messages';
import {UserLogin} from "../user/user.login";
import {Response} from "../service/server.response";
import {MessageService} from "../service/MessageService";


@Component(
  {
    selector: 'app-event',
    templateUrl: 'event.component.html'
  }
)

export class EventComponent implements OnInit{
  events$ : Event[];
  showDetails;
  isAdmin;
  isOrganizer;
  currentEvent: Event;
  loggedUser: UserLogin;
  response: Response;
  prevId : number;

  constructor(private messageService: MessageService,
    private NgFlashMessageService: NgFlashMessageService ,private route: ActivatedRoute, private eventService: eventService){
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.loggedUser.userRole =="admin")
      this.isAdmin = true;
    if (this.loggedUser.userRole== "organizer")
      this.isOrganizer = true;
  }

  ngOnInit(): void {
    this.getEvents();
    if (this.messageService.getMessage()) this.showMSG();
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
     let message;

    this.eventService.bookATicket(this.loggedUser.userId,eventID).subscribe(
      action => {
        switch (action.responseIndicator) {
          case 0:
            message = "danger";
            break;
          case 1:
            message = "warning";
            break;
          case 2:
            message = "success";
            break;

        }
        this.NgFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: [action.text],
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true,
          // Time after which the flash disappears defaults to 2000ms
          timeout: 2000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: message
        });
      },
      err => console.log(err),
      () => console.log('booking a ticket...')
    )
  }


  deleteEvent(event_id:number){
    let message;
    this.eventService.deleteEvent(event_id).subscribe( action =>{

        switch (action.responseIndicator) {
          case 0:
            message = "danger";
            break;
          case 1:
            message = "warning";
            break;
          case 2:
            message = "success";
            break;

        }
        this.NgFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: [action.text],
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true,
          // Time after which the flash disappears defaults to 2000ms
          timeout: 2000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: message
        });
        this.getEvents();
      },
      err => console.log(err),
      () => console.log('removing the event...')
    )
  }

  showMSG(){
    this.messageService.getMessage().subscribe(params => {
        let message;
        switch (params.responseIndicator) {
          case 0:
            message = "danger";
            break;
          case 1:
            message = "warning";
            break;
          case 2:
            message = "success";
            break;


        }
        //alert(this.response.text);
        this.NgFlashMessageService.showFlashMessage({
          // Array of messages each will be displayed in new line
          messages: [params.text],
          // Whether the flash can be dismissed by the user defaults to false
          dismissible: true,
          // Time after which the flash disappears defaults to 2000ms
          timeout: 7000,
          // Type of flash message, it defaults to info and success, warning, danger types can also be used
          type: message
        });
      },
      err => console.log(err),
      ()=>console.log('printing a msg'));
  }
}
