import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AlertService} from "../../service/alert.service";
import {EventService} from "../../events/eventService";
import {UserService} from "../UserService";

@Component(
  {
    selector: 'single-user',
    templateUrl: './single.user.page.html'
  }
)

export class SingleUserPage implements OnInit{
  constructor(private Router:Router,private flashMSG:AlertService,
              private eventService:EventService,private userService:UserService){

  }

  ngOnInit(): void {
  }

}
