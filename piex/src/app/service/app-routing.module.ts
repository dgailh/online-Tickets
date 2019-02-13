import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "../app.component";
import {RegisterComponent} from "../register/register.component";
import {UserComponent} from "../user/user.component";
import {LoginComponent} from "../login/login.component";
import {EventComponent} from "../events/event.component";
import {AdminEvent} from "../events/admin.event";
import {EventCreate} from "../events/event.create";

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
  // {path: 'detail/:id', component: CityDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }