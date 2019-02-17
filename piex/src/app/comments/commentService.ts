import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Comment} from "./comment";
import {CommentDTO} from "./commentDTO";
import {Response} from "../service/server.response";

const headers = new HttpHeaders().set('Content-Type', 'application/json');
const API_ARGS = {headers: headers};

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {
  }

  getComments(event_id:number): Observable<Comment[]>{

    return this.http.get<Comment[]>('api/comments/comments/'+event_id).pipe(
      catchError(err => {
        console.log('Error! Cant reach the server!', err);
        return of([])
      })
    )
  }

  addComment(comment: CommentDTO){
    console.log(JSON.stringify(comment), API_ARGS)
    return this.http.post<Response>('api/comments/createComment', JSON.stringify(comment), API_ARGS)
  }

}
