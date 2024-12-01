import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Evento, EventoAdd } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private router: Router) {}
  private apiUrl = 'http://localhost:3000/eventos';

  public getAllEvents() : Observable<any> {
    return this.http.get(`${this.apiUrl}/listarTodosEventos`, {
      withCredentials: true, 
    });
  }

  public getEventoById(id: number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/DetalleEvento/${id}`, {
      withCredentials: true, 
    });
  }

  public deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarEvento/${id}`, {
      withCredentials: true,
    }).pipe(
      tap(response => {
        console.log('Respuesta de la eliminación:', response); 
      })
    );
  }


  public editEvent(event: Evento): Observable<any> {
    return this.http.put(`${this.apiUrl}/modificarEvento/${event.id}`, event, {
      withCredentials: true,
    }).pipe(
      tap(response => {
        console.log('Respuesta de la edicion:', response); 
      })
    );
  }

  public agregarEvento (event: EventoAdd): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregarEvento`, event, {
      withCredentials: true,
    }).pipe(
      tap(response => {
        console.log('Respuesta de la edicion:', response); 
      })
    );
  }


  public GetEventsByDate(): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventosProximos`, {
      withCredentials: true, 
    });
  }

  public GetmyEventsSuscribed(): Observable<any> {
    return this.http.get(`${this.apiUrl}/eventosinscrito`, {
      withCredentials: true, 
    });
  }


  public getDataCertificate(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/certificados/${id}`, {
      withCredentials: true, 
    });
  }


}


