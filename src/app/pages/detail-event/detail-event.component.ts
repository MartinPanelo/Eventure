import { Component } from '@angular/core';
import { EventsService } from '../../core/services/events.service';
import { Evento } from '../../core/models/evento';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowTService } from '../../core/services/show-t.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css',
})
export class DetailEventComponent {
  minDate: Date = new Date();

/*   items: { label?: string; icon?: string; separator?: boolean }[] = []; */

  /*   eventId: number = 0;
   */ evento: Evento = {
    id: 0,
    nombre: '',
    fecha: new Date(),
    ubicacion: '',
    descripcion: '',
  };

  constructor(private eventService: EventsService, private router: Router,private showTService: ShowTService) {}

  ngOnInit(): void {
    // Recuperar los datos de la ruta usando history.state
    const navigation = history.state;
    if (navigation && navigation.id) {
      this.evento.id = navigation.id;

      this.getEventsById(this.evento.id);
      console.log('Evento ID:', this.evento.id);
    }
  }

  getEventsById(id: number): void {
    this.eventService.getEventoById(id).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        const event = response.data[0];
        this.evento = {
          id: event.Id,
          nombre: event.Nombre,
          fecha: new Date(event.Fecha),
          ubicacion: event.Ubicacion,
          descripcion: event.Descripcion,
        };
        this.minDate = new Date(event.Fecha);
        console.log(new Date(event.Fecha));
        console.log(this.evento.fecha);
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }

  // Función para enviar los cambios
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario enviado:hs' + this.evento.fecha);
      // Aquí puedes enviar los datos al servidor para actualizarlos
      this.eventService.editEvent(this.evento).subscribe((response) => {
        console.log('Evento actualizado:', response);
        this.showTService.showMessage('success', 'Exito', "Evento actualizado con exito");
        // Redireccionar a la página de eventos
        this.router.navigate(['/managerevents']);
      });
    } else {
      // Marcar todos los campos como touched para mostrar los errores
      Object.keys(form.controls).forEach((key) => {
        const control = form.controls[key];
        control.markAsTouched();
      });
    }
  }
}
