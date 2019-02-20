import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../user/user.login";
import { Router} from "@angular/router";
import {AlertService} from "../service/alert.service";
import {EventService} from "./eventService";

@Component(
  {
    selector: 'app-create-event',
    templateUrl: './event.create.html'
  }
)
export class EventCreate implements OnInit{
  messages: string;
  showMSG: boolean = false;
  isOrganizerOrAdmin: boolean = false;
  currentUser: UserLogin;
  myReactiveForm: FormGroup;
  constructor(
    private Router: Router,
    private flashMSG:AlertService,
    private formBuilder: FormBuilder, private eventService:EventService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if ( this.currentUser.userRole == 'admin'|| this.currentUser.userRole =='organizer') {
      this.isOrganizerOrAdmin = true;}

    if (!this.isOrganizerOrAdmin) {
      this.Router.navigate(['/home']);
    }

    this.myReactiveForm = this.formBuilder.group({
      name: [``, Validators.compose([Validators.required])],
      time: [``, Validators.compose([Validators.required])],
      seats: [``, Validators.compose([Validators.required ,Validators.max(300), Validators.min(1)])],
      location: [``, Validators.compose([Validators.required]),],
      organizer: [``]

    });
  }
  onSubmit() {
    this.myReactiveForm.patchValue({'organizer':''+this.currentUser.userId})
    this.eventService.addEvent(this.myReactiveForm.value).subscribe(action=>{
      this.showMSG = true;
        this.flashMSG.flashMSG(action.text,action.responseIndicator);

        //todo find out how these functions work in order so that it flash msg then wait then route
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
