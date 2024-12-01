import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';



  private userState = new BehaviorSubject<any>(null); // Estado del usuario compartido


  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, contrasena: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/loginUsuario`,
        { correo, contrasena },
        { withCredentials: true }
      )
      .pipe(
        tap((response: any) => {
          if (response.success) {
            this.checkSession();
          }
        })
      );
  };

  register(nombre: string, correo: string, contrasena: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/registrarUsuario`,
        { nombre, correo, contrasena },
        { withCredentials: true }
      )

  }

  checkSession(): Observable<any> {
    return this.http.get(`${this.apiUrl}/checkSession`, { withCredentials: true }).pipe(
      tap((response: any) => {
        if (response.success) {
          console.log('Usuario autenticado:', response.usuario);
          // Actualiza el estado global del usuario
          this.userState.next({
            isLoggedIn: true,
            correo: response.usuario.correo,
            rol: response.usuario.rol,
          });
        } else {
          this.userState.next({
            isLoggedIn: false,
            correo: null,
            rol: null,
          });
        }
      }),
      catchError(() => {
        console.error('Error verificando sesión');
        this.userState.next({
          isLoggedIn: false,
          email: null,
          rol: null,
        });
        return [false];
      })
    );
  }
  
  // Método para acceder al estado global del usuario
  getUserState(): Observable<any> {
    return this.userState.asObservable();
  }

  // Método para cerrar sesión
  logout() {
    return this.http
      .post(`${this.apiUrl}/logoutUsuario`, {}, { withCredentials: true })
      .pipe(
        tap((response) => {
          console.log('Respuesta del servidor:' + response);
          //     this.isLoggedIn.next(false);  // Actualiza el estado a 'no logueado'
          this.userState.next(null); // Limpia el correo
        })
      );
  }

  // Para las solicitudes posteriores que necesiten la cookie del token
  /*   getData() {
    return this.http.get('http://localhost:3000/eventos/listarTodosEventos', {
      withCredentials: true, // También necesitas esto en las solicitudes que requieran autenticación
    });
  } */
}
