import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//PrimeNG
import { FilterMatchMode, PrimeIcons, PrimeNGConfig } from 'primeng/api';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { AvatarModule } from 'primeng/avatar';
import { AutoCompleteModule } from "primeng/autocomplete"; 
import { InputTextModule } from "primeng/inputtext"; 
import { FloatLabelModule } from 'primeng/floatlabel';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule,  } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; // Asegúrate de importar MessageService
import { MessageModule } from 'primeng/message'; // Importa el MessageModule
import { CarouselModule } from 'primeng/carousel';




import { ButtonModule } from 'primeng/button';

//Angular Material
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './pages/login/login.component';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ManagerEventsComponent } from './pages/manager-events/manager-events.component';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DetailEventComponent } from './pages/detail-event/detail-event.component';
import { DialogModule } from 'primeng/dialog';
import { AssistEventComponent } from './pages/assist-event/assist-event.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { ListEventsComponent } from './pages/list-events/list-events.component';
import {MatListModule} from '@angular/material/list';
import { ListUserEventsComponent } from './pages/list-user-events/list-user-events.component';




const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
  // ......
  primeConfig.ripple = true;
  primeConfig.zIndex = {
    modal: 1100, // dialog, sidebar
    overlay: 1000, // dropdown, overlaypanel
    menu: 1000, // overlay menus
    tooltip: 1100, // tooltip
  };
  primeConfig.csp.set({ nonce: '...' });
  primeConfig.filterMatchModeOptions = {
    text: [
      FilterMatchMode.STARTS_WITH,
      FilterMatchMode.CONTAINS,
      FilterMatchMode.NOT_CONTAINS,
      FilterMatchMode.ENDS_WITH,
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS,
    ],
    numeric: [
      FilterMatchMode.EQUALS,
      FilterMatchMode.NOT_EQUALS,
      FilterMatchMode.LESS_THAN,
      FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
      FilterMatchMode.GREATER_THAN,
      FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
    ],
    date: [
      FilterMatchMode.DATE_IS,
      FilterMatchMode.DATE_IS_NOT,
      FilterMatchMode.DATE_BEFORE,
      FilterMatchMode.DATE_AFTER,
    ],
  };
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ManagerEventsComponent,
    DetailEventComponent,
    AssistEventComponent,
    AddEventComponent,
    ListEventsComponent,
    ListUserEventsComponent,
  ],
  imports: [
    ButtonModule,
    MegaMenuModule,
    AvatarModule,    
    InputTextModule,
    AutoCompleteModule,
    FloatLabelModule,
    FieldsetModule,
    MessagesModule,
    PasswordModule,
    CalendarModule,
    InputTextareaModule,
    SplitButtonModule,
    CardModule,
    DividerModule,
    ToastModule,
    MessageModule,
    CarouselModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    PanelModule,
    DialogModule,
    
      

    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatPaginator,
    MatListModule,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MessageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [PrimeNGConfig],
      multi: true,
      
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
