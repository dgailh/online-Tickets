import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MainComponent} from "./MainComponent";
import {UserComponent} from "./user/user.component";
import {AppComponent} from "./app.component";
import {RegisterComponent} from "./register/register.component";
import {AppRoutingModule} from "./service/app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UserService} from "./user/UserService";
import {LoginComponent} from "./login/login.component";
import {BasicAuthInterceptor} from "./service/basic-auth.interceptor";
import {ErrorInterceptor} from "./service/error.interceptor";
import {HomeComponent} from "./home/home.component";
import {EventComponent} from "./events/event.component";
import {eventService} from "./events/eventService";
import { NgFlashMessagesModule } from 'ng-flash-messages';
import {EventCreate} from "./events/event.create";
import {AdminEvent} from "./events/admin.event";
import { FlashMessagesModule } from 'angular2-flash-messages';
import {SingleEvent} from "./events/single.event";



@NgModule({
  declarations: [
    MainComponent,
    AppComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    EventComponent,
    EventCreate,
    AdminEvent,
    SingleEvent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgFlashMessagesModule.forRoot(),
    FlashMessagesModule.forRoot()
  ],
  providers: [        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserService, eventService],
  bootstrap: [MainComponent]
})
export class AppModule { }
