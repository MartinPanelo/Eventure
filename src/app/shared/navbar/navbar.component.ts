import { Component } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userEmail: string = '';
  isLoggedIn: boolean = false; // Estado de la sesión

  items: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserState().subscribe((userState) => {
      this.isLoggedIn = userState?.isLoggedIn || false;
      this.userEmail = userState?.correo || '';
      this.items = [
        {
          label: 'Pagina Principal',
          icon: PrimeIcons.HOME,
          routerLink: ['/landing'],
          styleClass: 'red',
        },
        {
          label: 'Eventos',
          routerLink: ['/listevents'],
          icon: PrimeIcons.CALENDAR,
          styleClass: 'green',
          visible: userState?.rol !== 'organizador',
        },
        {
          label: 'Mis Inscripciones',
          routerLink: ['/listmyevents'],
          icon: PrimeIcons.PLUS,
          styleClass: 'green',
          visible: this.isLoggedIn && userState?.rol === 'cliente',
        },
        {
          label: 'Gestion de eventos',
          routerLink: ['/managerevents'],
          icon: PrimeIcons.MINUS,
          styleClass: 'green',
          visible: this.isLoggedIn && userState?.rol === 'organizador',
        },
      ];
      console.log('Estado actualizado en el Navbar:', userState);
    });
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Sesión cerrada correctamente');
        this.isLoggedIn = false;
        return this.router.navigate(['/landing']);
        /* this.userEmail = ''; */
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }
}
