import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventsService } from '../../core/services/events.service';
import { Router } from '@angular/router';
import { Evento, EventoAdd } from '../../core/models/evento';
import { ShowTService } from '../../core/services/show-t.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {

  constructor( private router: Router ,private eventoService: EventsService, private showTService: ShowTService) { }

  minDate = new Date();
  nuevoEvento: EventoAdd = {
    nombre: '',
    fecha: new Date(),
    ubicacion: '',
    descripcion: '',
  };

  onAdd(form: NgForm) {
    if (form.valid) {
      console.log('Datos del nuevo evento:', this.nuevoEvento);
      
      // Llama al servicio para guardar el nuevo evento
      this.eventoService.agregarEvento(this.nuevoEvento).subscribe(
        (response) => {
          console.log('Evento agregado con éxito:', response);
          this.showTService.showMessage('success', 'Exito', "Evento creado con exito");
          // Opcional: Redirigir o limpiar el formulario
          this.nuevoEvento = { nombre: '', fecha: new Date(), ubicacion: '', descripcion: '' };
          form.resetForm();
        },
        (error) => {
          this.showTService.showMessage('error', 'Error', error.error.error);
          console.error('Error al agregar el evento:', error);
        }
      );
    }
  }
}
