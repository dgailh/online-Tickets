import {Component, OnInit} from "@angular/core";
import {UserLogin} from "../user/user.login";
import {ActivatedRoute, Router} from "@angular/router";
import {Event} from "./Event";
import {NgFlashMessageService} from "ng-flash-messages";
import {CommentService} from "../comments/commentService";
import {Comment} from "../comments/comment";
import {CommentDTO} from "../comments/commentDTO";
import {AlertService} from "../service/alert.service";
import {EventService} from "./eventService";

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

  constructor(private flashMSG:AlertService,
              private NgFlashMessageService:NgFlashMessageService,
              private commentService: CommentService,
              private Router: Router,private route: ActivatedRoute,
               private eventService:EventService){

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

    if (comment.trim() =="") return;
    this.nComment = new CommentDTO(comment,this.loggedUser.userId,this.event_id);
    console.log(JSON.stringify(this.nComment));
    this.commentService.addComment(this.nComment).subscribe(data =>{
      this.flashMSG.flashMSG(data.text,data.responseIndicator);
      this.comments(this.event_id);
      // to empty the comment input after taking the value from it
      this.newComment="";
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
        this.flashMSG.flashMSG(action.text,action.responseIndicator);
      },
      err => console.log(err),
      () => console.log('booking a ticket...')
    )
  }



}
