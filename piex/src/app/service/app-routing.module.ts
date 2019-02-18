import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "../app.component";
import {RegisterComponent} from "../register/register.component";
import {UserComponent} from "../user/user.component";
import {LoginComponent} from "../login/login.component";
import {EventComponent} from "../events/event.component";
import {AdminEvent} from "../events/admin.event";
import {EventCreate} from "../events/event.create";
import {SingleEvent} from "../events/single.event";
import {SingleUserPage} from "../user/single.user/single.user.page";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: AppComponent},
  {path: 'users', component: UserComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'events', component: EventComponent},
  {path: 'admin/events', component:AdminEvent},
  {path: 'events/create', component:EventCreate},
  {path: 'events/event', component:SingleEvent},
  {path: 'users/user/:id', component:SingleUserPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
