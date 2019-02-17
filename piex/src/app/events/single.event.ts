import {Component, OnInit} from "@angular/core";
import {eventService} from "./eventService";
import {UserLogin} from "../user/user.login";
import {ActivatedRoute, Router} from "@angular/router";
import {Event} from "./Event";
import {NgFlashMessageService} from "ng-flash-messages";
import {CommentService} from "../comments/commentService";
import {Comment} from "../comments/comment";
import {CommentDTO} from "../comments/commentDTO";

@Component(
  {
    selector: 'app-single-event',
    templateUrl: './single.event.html'
  }
)
//todo create route and activated route to take param from url of the event id oke?
export class SingleEvent implements OnInit{
  isGuest: boolean;
  event: Event;
  event_id: number;
  no_param: boolean;
  loggedUser: UserLogin;
  completedComments: boolean;
  completedEvent: boolean;
  comments$: Comment[];
  newComment: string;
  nComment : CommentDTO;

  constructor(private NgFlashMessageService:NgFlashMessageService,
              private commentService: CommentService,
              private Router: Router,private route: ActivatedRoute,
               private eventService: eventService){

    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.loggedUser){
      this.isGuest=true;
    }
    // if there is no parameters in URL return to events
    //else assign the id to this.event_id
    this.route.params.subscribe(params =>{
        this.event_id = params['id'];
        if (this.event_id ==null){
          this.no_param= true;
        }
        if (this.no_param){
          this.Router.navigate(['/events']);
        }
      },
      error1 => console.log(error1),
      () => console.log("getting event")
    );
  }

  ngOnInit(): void {

    this.eventDetails(this.event_id);
    this.comments(this.event_id);

  }

  eventDetails(id:number){
    this.eventService.getSingleEvent(id).subscribe(data =>{

      this.event = data;
      this.completedEvent = true;
    })
  }
  comments(event_id : number){

    this.commentService.getComments(event_id).subscribe(data =>{

      this.comments$ = data;
      this.completedComments = true;
    })
  }

  addComment(comment:string){

    if (comment =="") return;
    this.nComment = new CommentDTO(comment,this.event_id,this.loggedUser.userId);
    console.log(JSON.stringify(this.nComment));
    this.commentService.addComment(this.nComment).subscribe(data =>{
      this.flashMSG(data.text,data.responseIndicator);
        this.comments(this.event_id);
    },
      error1 => console.log(error1),
      ()=> console.log("adding comment"));


  }

  bookATicket(event_Id: number){
    if (this.isGuest){
      this.Router.navigate(['/login']);
    }
    this.eventService.bookATicket(this.loggedUser.userId,event_Id).subscribe(
      action => {
        this.flashMSG(action.text,action.responseIndicator);
      },
      err => console.log(err),
      () => console.log('booking a ticket...')
    )
  }

  flashMSG(text: string,indicator: number){
    let message;
    switch (indicator) {
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
      messages: [text],
      // Whether the flash can be dismissed by the user defaults to false
      dismissible: true,
      // Time after which the flash disappears defaults to 2000ms
      timeout: 2000,
      // Type of flash message, it defaults to info and success, warning, danger types can also be used
      type: message
    });
  }

}
