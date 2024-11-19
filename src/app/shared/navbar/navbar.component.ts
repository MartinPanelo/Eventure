import { Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userEmail: string = '';
  isLoggedIn: boolean = false; // Estado de la sesión
  
  items: any[];

  constructor(private authService: AuthService) {
   
    this.items = [
      {
        label: 'Pagina Principal',
        icon: PrimeIcons.HOME,
        routerLink: ['/landing'],
        styleClass: 'red',
      },
      {
        label : 'Eventos',
       
        icon: PrimeIcons.CALENDAR,
        styleClass: 'green',
      },
      {
        label : 'Gestion de eventos',
        routerLink: ['/managerevents'],
        icon: PrimeIcons.MINUS,
        styleClass: 'green',
      }
    ];
  }

  ngOnInit() {
    this.authService.getUserEmail().subscribe(email => {
      this.userEmail = email;
    });
    this.authService.isLoggedGet().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
    
  }


   // Método para cerrar sesión
   logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Sesión cerrada correctamente');
        this.isLoggedIn = false;
        this.userEmail = '';
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }
}
