import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {NgFlashMessageService} from "ng-flash-messages";

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private NgFlashMessageService:NgFlashMessageService,
              private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
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
