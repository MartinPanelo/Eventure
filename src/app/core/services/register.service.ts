import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient, private router: Router) {}
  private apiUrl = 'http://localhost:3000/registros';


  public getListUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/listarConfirmados/${id}`, {
      withCredentials: true,
    });
  }

  public setAsistencia(id: number, usuarioId: number, asistencia: boolean): Observable<any> {
  
    return this.http.put(`${this.apiUrl}/marcarAsistencia/${id}`, { usuarioId, asistencia }, {
      withCredentials: true,
    });
  
  }

  public SetParticipacion(eventoId: number): Observable<any> {
 
    return this.http.post(`${this.apiUrl}/agregarParticipacion`, { eventoId }, {
      withCredentials: true,
    });
  
  }

  public UnSetParticipacion(Id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarParticipacion/${Id}}`, {
      withCredentials: true,
    });
  }

  public GetCertificadoParticipacion(Id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/emitirCertificado/${Id}`, {
      withCredentials: true,
    });
  }


}
