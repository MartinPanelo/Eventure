import { Component } from '@angular/core';
import { EventsService } from '../../core/services/events.service';
import { Router } from '@angular/router';
import { Evento } from '../../core/models/evento';
import { RegisterService } from '../../core/services/register.service';
import { ShowTService } from '../../core/services/show-t.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrl: './list-events.component.css',
})
export class ListEventsComponent {
  visible = false;
  eventos: Evento[] = [];
  EventoSeleccionado: Evento = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha: new Date(),
    ubicacion: '',
  }

  constructor(private registerService: RegisterService, private eventsService: EventsService, private router: Router, private showTService: ShowTService) {}

  ngOnInit() {
    this.getAllEventsByDate();
  }

  getAllEventsByDate(): void {
    this.eventsService.GetEventsByDate().subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.eventos = response.data.map((event: any) => ({
          id: event.Id,
          nombre: event.Nombre,
          fecha: new Date(
            event.Fecha.toLocaleString('en-US', {
              timeZone: 'America/Argentina/Buenos_Aires',
            })
          ),
          ubicacion: event.Ubicacion,
          descripcion: event.Descripcion,
        }));
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }


  showDialog(eventoSeleccionado: Evento) {
    console.log(eventoSeleccionado);
    this.visible = true;
    this.EventoSeleccionado = eventoSeleccionado;
  }

  inscribirse(id: number) {

    this.registerService.SetParticipacion(id).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.showTService.showMessage("info", 'Exito', "Incripcion realizada con exito");
        this.getAllEventsByDate();
      },
      (error) => {
        if(error.status == 401){// se quiere registrar a un evento sin estar logeado
          this.showTService.showMessage("info", 'Error', "Debes estar logeado para realizar la inscripcion");
        }else{
          this.showTService.showMessage("error", 'Error', error.error.error);}
        console.error('Error en la solicitud:', error);

      }
    );
  }
}
