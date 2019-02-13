import {Component, OnInit} from "@angular/core";
import {eventService} from "./eventService";
import {UserLogin} from "../user/user.login";
import {Event} from "./Event";
import { NgFlashMessageService } from 'ng-flash-messages';
import {routerNgProbeToken} from "@angular/router/src/router_module";
import {Router} from "@angular/router";

@Component(
  {
    selector: 'admin-event',
    templateUrl: './admin.event.html'
  }
)

export class AdminEvent implements OnInit{
  currentUser: UserLogin;
  events$ : Event[];

  constructor(private Router:Router,private NgFlashMessageService: NgFlashMessageService,private eventService: eventService){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.userRole !='admin')
      this.Router.navigate(['/events']);




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
    let message;
    this.eventService.approveEvent(event_id).subscribe(action => {
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
      () => console.log('booking a ticket...'))
  }

  disapproveEvent(event_id:number){
    let message;
    this.eventService.disapproveEvent(event_id).subscribe(action => {
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
      () => console.log('booking a ticket...'))
  }
}
