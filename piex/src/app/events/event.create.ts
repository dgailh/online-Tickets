import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {eventService} from "./eventService";
import {UserLogin} from "../user/user.login";
import { NgFlashMessageService } from 'ng-flash-messages';
import {NavigationExtras, Router} from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { MessageService} from "../service/MessageService";

@Component(
  {
    selector: 'app-create-event',
    templateUrl: './event.create.html'
  }
)
export class EventCreate implements OnInit{
  currentUser: UserLogin;
  myReactiveForm: FormGroup;
  constructor(private messageService: MessageService,
    private Router: Router,private flashMessagesService: FlashMessagesService,
    private NgFlashMessageService: NgFlashMessageService,
    private formBuilder: FormBuilder, private eventService: eventService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.myReactiveForm = this.formBuilder.group({
      name: [``, Validators.compose([Validators.required])],
      time: [``, Validators.compose([Validators.required])],
      seats: [``, Validators.compose([Validators.required ,Validators.max(300), Validators.min(1)])],
      location: [``, Validators.compose([Validators.required]),],
      organizer: [``]

    });
  }
  onSubmit() {
    let message;
    this.myReactiveForm.patchValue({'organizer':''+this.currentUser.userId})
    this.eventService.addEvent(this.myReactiveForm.value).subscribe(action=>{

        this.messageService.sendMessage(action);
        this.Router.navigate(["/events"]);
      },
      err => console.log(err),
      () => {
        console.log('creating event...')
      },
    )
    };

}

