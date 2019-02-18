import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../service/alert.service";
import {EventService} from "../../events/eventService";
import {UserService} from "../UserService";
import {UserLogin} from "../user.login";
import {User} from "../User";
import {Event} from "../../events/Event";
import {Ticket} from "../tickets/Ticket";

@Component(
  {
    selector: 'single-user',
    templateUrl: './single.user.page.html'
  }
)

export class SingleUserPage implements OnInit{
  isGuest: boolean;
  isOrganizer: boolean;
  isOwner: boolean;
  loaded: boolean =false;
  eventsLoaded: boolean= false;
  loggedUser: UserLogin;
  userID: number;
  no_param: boolean;
  user_data : User;
  events$  :Event[];
  tickets$ :Ticket[];
  eventsData : boolean;


  constructor(private Router:Router,private flashMSG:AlertService,private route: ActivatedRoute,
              private eventService:EventService,private userService:UserService) {
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.loggedUser){
      this.isGuest=true;
    }

    this.route.params.subscribe(params =>{
        this.userID = params['id'];
        if (this.userID ==null){
          this.no_param= true;
        }
        if (this.no_param){
          this.Router.navigate(['/users']);
        }
        if (this.userID == this.loggedUser.userId){
          this.isOwner= true;
          this.getUserTickets(this.userID);
        }
      },
      error1 => console.log(error1),
      () => console.log("getting event")
    );

    this.userService.getUser(this.userID).subscribe(data=>{
      this.user_data = data;
      if (this.user_data.role=='organizer')
        this.organizerEvents(this.user_data.id);
      this.loaded=true;
    })
  }

  ngOnInit(): void {

  }

  organizerEvents(org_id){
    this.eventService.getEventsByOrganizer(org_id).subscribe(data=>{
      this.events$ = data;
      this.eventsData= true;
      this.eventsLoaded=true;
    })
  }

  getUserTickets(id:number){
    this.userService.userTickets(id).subscribe(tickets =>{
      this.tickets$ = tickets;
    })
  }

  deleteTicket(ticket_id:number, user_id:number){
    this.userService.deleteTicket(ticket_id).subscribe(action =>
      {
        this.flashMSG.flashMSG(action.text,action.responseIndicator);
        this.getUserTickets(user_id)
      },
      err => console.log(err),
      () => console.log('removing a ticket...')
    )
  }

  advanceEvent(event_id : number){
    this.Router.navigate(['/events/event',{id: event_id}]);
  }
}
