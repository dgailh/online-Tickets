import {Component, OnInit} from "@angular/core";
import {eventService} from "./eventService";
import {UserLogin} from "../user/user.login";
import {Router} from "@angular/router";
import {NgFlashMessageService} from "ng-flash-messages";



@Component(
  {
    selector: 'app-single-event',
    templateUrl: './single.event.html'
  }
)

export class SingleEvent implements OnInit{
  currentUser: UserLogin;
  isGuest: boolean;
  constructor(private Router: Router,
               private eventService: eventService){

  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.currentUser){
      this.isGuest=false;
    }
  }

  eventDetails(id:number){
    this.eventService.getSingleEvent(id).subscribe(data =>{

    })
  }

}
