import {Component, OnInit} from "@angular/core";
import {eventService} from "./eventService";
import {UserLogin} from "../user/user.login";
import {ActivatedRoute, Router} from "@angular/router";
import {Event} from "./Event";
import {switchMap} from "rxjs/operators";


@Component(
  {
    selector: 'app-single-event',
    templateUrl: './single.event.html'
  }
)
//todo create route and activated route to take param from url of the event id oke?
export class SingleEvent implements OnInit{
  currentUser: UserLogin;
  isGuest: boolean;
  event: Event;
  event_id: number;
  no_param: boolean;

  constructor(private Router: Router,private route: ActivatedRoute,
               private eventService: eventService){
  }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.currentUser){
      this.isGuest=false;
    }
    this.route.params.subscribe(params =>{
      this.event_id = params['id'];
      if (this.event_id ==null)
        this.no_param= true;
    });

    if (this.no_param){
      this.Router.navigate(['/events']);
    }
    this.eventDetails(this.event_id);
  }

  eventDetails(id:number){
    this.eventService.getSingleEvent(id).subscribe(data =>{

      this.event = data;
    })
  }

}
