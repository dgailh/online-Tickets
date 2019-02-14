import { Component, OnInit } from '@angular/core';
// import {Observable} from 'rxjs';
import {User} from './User';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from './UserService';
import {FormBuilder} from "@angular/forms";
import {Ticket} from "./tickets/Ticket";
import {NgFlashMessageService} from "ng-flash-messages";
import {UserLogin} from "./user.login";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  users$: User[];
  currentUser: User;
  isEditing: boolean = false;
  showTickets = false;
  tickets$: Ticket[];
  loggedUser: UserLogin;
  isAdmin;

  constructor(private Router: Router,
              private NgFlashMessageService: NgFlashMessageService ,
              private route: ActivatedRoute,
              private userService: UserService, private formBuilder: FormBuilder) {

    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.loggedUser){
    if(this.loggedUser.userRole =="admin")
      this.isAdmin = true;}
    else
      this.Router.navigate(['/home']);
  }

  ngOnInit() {

    this.getUsers();

  }

  getUsers() {
    this.userService.getUsers().subscribe(
      userData => {
        this.users$ = userData;
      },
      err => console.log(err),
      () => console.log('Getting users complete...')
    );



  };
  updateUser(user : User) {
    //this.userService.updateUser(this.currentUser);

    if (!this.isEditing){
      this.isEditing= true;
    this.currentUser = user;
    }
    else
      this.isEditing= false;

  }

  deleteUser(id_number:number){
    this.userService.deleteUser(id_number).subscribe( result =>
    {
      this.getUsers()
    })
    ;
  }

  getUserTickets(id:number){
    this.userService.userTickets(id).subscribe(tickets =>{
      this.tickets$ = tickets;
      this.showTickets = true;
    })
  }

  deleteTicket(ticket_id:number, user_id:number){
    let message;
    this.userService.deleteTicket(ticket_id).subscribe(action =>
    {
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
     this.getUserTickets(user_id)
    },
      err => console.log(err),
      () => console.log('removing a ticket...')
    )
  }

  onSubmit(user: User){

    this.userService.updateUser(user).subscribe(userData => {
      this.getUsers();
      console.log("form submitted is "+ user+ "\n " + userData)}
    );

  }
}
