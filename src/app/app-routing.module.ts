import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ManagerEventsComponent } from './pages/manager-events/manager-events.component';
import { DetailEventComponent } from './pages/detail-event/detail-event.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent},
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'managerevents', component: ManagerEventsComponent},
  { path: 'detailevent', component: DetailEventComponent},
  { path: '**', redirectTo: 'landing'}
];



/* export const routes: Routes = [
  { path: 'landing', component: LandingPagesComponent },
  { path: 'loginUsuario', component: LoginComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', redirectTo: '/landing', pathMatch: 'full' },
  
];
 */


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
