import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  
  features: any[] = [];
  responsiveOptions: any[] = [];


  ngOnInit() {
    this.features = [
      {
        title: 'Registro de Eventos',
        description: 'Los organizadores pueden agregar nuevos eventos especificando nombre, fecha, ubicación y descripción.',
      },
      {
        title: 'Registro de Eventos',
        description: 'Los organizadores pueden ver una lista de todos los eventos existentes y realizar operaciones de edición y eliminación sobre los eventos.',
      },
      {
        title: 'Visualización de Eventos',
        description: 'Los usuarios pueden ver una lista de eventos próximos ordenados por fecha.',
      },
      {
        title: 'Visualización de Eventos',
        description: 'Los usuarios pueden hacer clic en un evento para ver detalles como la ubicación y la descripción.',
      },
      {
        title: 'Registro de Asistentes',
        description: 'Los usuarios pueden registrarse para asistir a un evento proporcionando su nombre y dirección de correo electrónico.',
      },
      {
        title: 'Registro de Asistentes',
        description: 'Una vez registrado un usuario, puede confirmar su participación en el evento.',
      },
      {
        title: 'Confirmación de Participación',
        description: 'Los organizadores pueden marcar la asistencia de los usuarios que realmente participaron en el evento.',
      },
      {
        title: 'Confirmación de Participación',
        description: 'Los organizadores pueden ver una lista de los participantes confirmados para cada evento.',
      },
      {
        title: 'Descarga de Certificados',
        description: 'Después de que un usuario haya confirmado su participación en un evento, pueden descargar un certificado de participación en formato PDF.',
      }
    ];
     
    

    
  }
}