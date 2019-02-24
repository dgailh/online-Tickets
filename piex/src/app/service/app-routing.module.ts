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
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'home', component: AppComponent},
  {path: 'users', component: UserComponent, canActivate : [AuthGuard]},
  {path: 'user/:id', component: UserComponent, canActivate : [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'events', component: EventComponent, canActivate : [AuthGuard]},
  {path: 'admin/events', component:AdminEvent, canActivate : [AuthGuard], data : { expectedRole : ['admin']}},
  {path: 'events/create', component:EventCreate, canActivate : [AuthGuard], data : { expectedRoles : ['organizer','admin']}},
  {path: 'events/event', component:SingleEvent, canActivate : [AuthGuard]},
  {path: 'users/user/:id', component:SingleUserPage, canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
