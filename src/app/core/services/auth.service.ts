import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuarios';

  private userEmail = new BehaviorSubject<string>('');

  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  login(correo: string, contrasena: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/loginUsuario`, { correo, contrasena }, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          if (response.success) {
            this.isLoggedIn.next(true);
            this.userEmail.next(response.usuario.correo);
            this.router.navigate(['/landing']);
          }
        })
      );
  }
  // Getter para obtener el observable del correo
  getUserEmail(): Observable<string> {
    return this.userEmail.asObservable();
  }

  isLoggedGet(): Observable<boolean> {
    return this.isLoggedIn.asObservable(); // Devuelve el valor actual
  }
  // Método para cerrar sesión
  logout() {
    return this.http.post(`${this.apiUrl}/logoutUsuario`, {}, { withCredentials: true }).pipe(
      tap(( response) => {
        console.log("Respuesta del servidor:" + response);
        this.isLoggedIn.next(false);  // Actualiza el estado a 'no logueado'
        this.userEmail.next('');  // Limpia el correo
      })
    );
  }

  // Para las solicitudes posteriores que necesiten la cookie del token
  getData() {
    return this.http.get('http://localhost:3000/eventos/listarTodosEventos', {
      withCredentials: true, // También necesitas esto en las solicitudes que requieran autenticación
    });
  }
}
