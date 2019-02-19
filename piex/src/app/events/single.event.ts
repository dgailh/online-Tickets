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
import {LikesJSON} from "./likes.and.dislikes/likesJSON";

@Component(
  {
    selector: 'app-single-event',
    templateUrl: './single.event.html'
  }
)
//todo create route and activated route to take param from url of the event id oke?
export class SingleEvent implements OnInit{
  isGuest: boolean;
  isOld: boolean =false;
  event: Event;
  event_id: number;
  no_param: boolean;
  loggedUser: UserLogin;
  likesJSON :LikesJSON;
  completedComments: boolean;
  completedEvent: boolean;
  completedLikes: boolean;
  comments$: Comment[];
  newComment: string;
  nComment : CommentDTO;
  likes : number;
  dislikes: number;

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

  eventDetails(event_id:number){
    this.eventService.getSingleEvent(event_id).subscribe(data =>{

      this.event = data;
      this.completedEvent = true;
      //for old events and deleted ones. if the user went to them through Organizer
      // since you can view old events to check them from organizer profile.
      //also it show likes and dislikes, only who have ticket and attended the event can rate it.
      if (Date.parse(this.event.time) <= Date.now()){
        this.isOld=true;
        this.callLikes();
      }
        });
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
        this.eventDetails(this.event.id);
      },
      err => console.log(err),
      () => console.log('booking a ticket...')
    )
  }

  callLikes(){
    this.eventService.getLikes(this.event.id).subscribe(data=>{
      this.likes = data.likes;
      this.dislikes = data.dislikes;
      this.completedLikes = true;
    },error1 => console.log(error1),
      ()=> {console.log("getting likes and dislikes ")})
  }

  like(){
    this.initLikes(true,false)

  }

  dislike(){
    this.initLikes(false,true)

  }

  initLikes(like:boolean,dislike : boolean){

    this.likesJSON.like=like;
    this.likesJSON.dislike=dislike;
    this.eventService.addLike(this.likesJSON,this.loggedUser.userId).subscribe(data=>{
      this.flashMSG.flashMSG(data.text,data.responseIndicator);
      //refresh page
      this.eventDetails(this.event_id);
      }
    );
  }
}
