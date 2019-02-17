import {Component, OnInit} from "@angular/core";
import {eventService} from "./eventService";
import {UserLogin} from "../user/user.login";
import {Event} from "./Event";
import {Router} from "@angular/router";
import {AlertService} from "../service/alert.service";

@Component(
  {
    selector: 'admin-event',
    templateUrl: './admin.event.html'
  }
)

export class AdminEvent implements OnInit{
  currentUser: UserLogin;
  events$ : Event[];

  constructor(private Router:Router,private flashMSG:AlertService,
              private eventService: eventService){
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
    this.eventService.approveEvent(event_id).subscribe(action => {

        this.flashMSG.flashMSG(action.text,action.responseIndicator);
      },
      err => console.log(err),
      () => console.log('booking a ticket...'))
  }

  disapproveEvent(event_id:number){
    this.eventService.disapproveEvent(event_id).subscribe(action => {

      this.flashMSG.flashMSG(action.text,action.responseIndicator);
      },
      err => console.log(err),
      () => console.log('booking a ticket...'))
  }
}
