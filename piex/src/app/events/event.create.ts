import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {eventService} from "./eventService";
import {UserLogin} from "../user/user.login";
import { NgFlashMessageService } from 'ng-flash-messages';


@Component(
  {
    selector: 'app-create-event',
    templateUrl: './event.create.html'
  }
)
export class EventCreate implements OnInit{
  currentUser: UserLogin;
  myReactiveForm: FormGroup;
  constructor(private NgFlashMessageService: NgFlashMessageService,private formBuilder: FormBuilder, private eventService: eventService) { }

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
      () => console.log('creating event...')
    )
    };
    //console.log('Form submitted: ', this.myReactiveForm.value);

}


