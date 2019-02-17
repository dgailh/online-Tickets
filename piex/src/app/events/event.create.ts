import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {eventService} from "./eventService";
import {UserLogin} from "../user/user.login";
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router} from "@angular/router";
import { MessageService} from "../service/MessageService";

@Component(
  {
    selector: 'app-create-event',
    templateUrl: './event.create.html'
  }
)
export class EventCreate implements OnInit{
  messages: string;
  showMSG: boolean = false;
  currentUser: UserLogin;
  myReactiveForm: FormGroup;
  constructor(private messageService: MessageService,
    private Router: Router,
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
      this.messages = action.text;
      this.showMSG = true;
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

        this.wait(3000);
        this.Router.navigate(["/events"]);
      },
      err => console.log(err),
      () => {
        console.log('creating event...')
      },
    )
    };

    wait(ms){
    let start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

}
