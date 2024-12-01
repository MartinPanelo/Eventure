import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ManagerEventsComponent } from './pages/manager-events/manager-events.component';
import { DetailEventComponent } from './pages/detail-event/detail-event.component';
import { routesGuardisLogin, routesGuardRol } from './core/routes.guard';
import { AssistEventComponent } from './pages/assist-event/assist-event.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { ListEventsComponent } from './pages/list-events/list-events.component';
import { ListUserEventsComponent } from './pages/list-user-events/list-user-events.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent},
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'managerevents', component: ManagerEventsComponent, canActivate: [routesGuardisLogin, routesGuardRol]},
  { path: 'detailevent', component: DetailEventComponent, canActivate: [routesGuardisLogin, routesGuardRol]},
  { path: 'asistevent', component: AssistEventComponent, canActivate: [routesGuardisLogin, routesGuardRol]},
  { path: 'addevent', component: AddEventComponent, canActivate: [routesGuardisLogin, routesGuardRol]},

  //aca los clientes
  { path: 'listevents', component: ListEventsComponent,/*  canActivate: [routesGuardisLogin] */},
  { path: 'listmyevents', component: ListUserEventsComponent, canActivate: [routesGuardisLogin]},


  { path: '**', redirectTo: 'landing'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
