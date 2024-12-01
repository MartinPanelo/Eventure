import { Component, ViewChild } from '@angular/core';
import { Evento } from '../../core/models/evento';
import { EventsService } from '../../core/services/events.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../../core/services/register.service';
import { registroDTO } from '../../core/models/registro';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ShowTService } from '../../core/services/show-t.service';

@Component({
  selector: 'app-assist-event',
  templateUrl: './assist-event.component.html',
  styleUrl: './assist-event.component.css',
})
export class AssistEventComponent {
 
  displayedColumns: string[] = ['nombre', 'correo', 'asistencia'];
  dataSource = new MatTableDataSource<registroDTO>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  asistenciaSeleccionada: boolean = false;
  usuario: number = 0;
  setData(id: number, valor: boolean) {
    this.usuario = id;
    this.asistenciaSeleccionada = valor;
    this.onSubmit();
  }
  evento: Evento = {
    id: 0,
    nombre: '',
    fecha: new Date(),
    ubicacion: '',
    descripcion: '',
  };
    
  RegistrosD: registroDTO[] = [];
  constructor(private registerService: RegisterService, private router: Router, private showTService: ShowTService) {}

  ngOnInit(): void {
    // Recuperar los datos de la ruta usando history.state
    const navigation = history.state;
    console.log(navigation.id);
    if (navigation && navigation.id) {
      this.evento.id = navigation.id;
      console.log('Evento ID:', this.evento.id);
        this.getConfirmedListUser(this.evento.id);
    }
  }


  getConfirmedListUser(id: number): void {
    this.registerService.getListUser(id).subscribe(
      (response: any) => {
        if (response) {
         
          console.log('Respuesta del servidor:', response);
          this.evento = response.data.evento;
          // Convertir la fecha al formato deseado
          if (this.evento?.fecha) {
            this.evento.fecha = new Date(
              new Date(this.evento.fecha).toLocaleString('en-US', {
                timeZone: 'America/Argentina/Buenos_Aires',
              })
            );
          }
          this.RegistrosD = response.data.usuarios;
          this.dataSource.data = this.RegistrosD;
          console.log(this.RegistrosD);
        } else {
          console.log(
            'Error al obtener la lista de usuarios' + response.message
          );
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }


  onSubmit() {
    console.log('Asistencia seleccionada:', this.asistenciaSeleccionada);
    console.log("para el servidor:", this.evento.id, this.usuario, this.asistenciaSeleccionada);
  
    // Aquí puedes enviar el valor a tu API
    this.registerService.setAsistencia(this.evento.id, this.usuario, this.asistenciaSeleccionada).subscribe(
      
      (response) => {
        if (response) {
         console.log('Respuesta del servidor:', response);
         if (this.asistenciaSeleccionada) {
          this.showTService.showMessage('info', 'Exito', 'asistencia marcada con exito');
        } else {
          this.showTService.showMessage('warn', 'Exito', 'asistencia cancelada con exito');
          }
         
          // Actualiza localmente
        this.RegistrosD = this.RegistrosD.map((registro) =>
          registro.id === this.usuario ? { ...registro, asistencia: this.asistenciaSeleccionada } : registro
        );
        this.dataSource.data = this.RegistrosD;
        }
        
       
      },
      (error) => {
        this.showTService.showMessage('error', 'Error', error.error.error);

        console.error('Error en la solicitud:', error);
      }
    );
  }
}
