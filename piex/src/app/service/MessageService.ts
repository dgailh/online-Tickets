import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Response} from "./server.response";

@Injectable({ providedIn: 'root' })
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: Response) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
