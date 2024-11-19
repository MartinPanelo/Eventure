import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Evento } from '../../core/models/evento';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EventsService } from '../../core/services/events.service';

@Component({
  selector: 'app-manager-events',
  templateUrl: './manager-events.component.html',
  styleUrl: './manager-events.component.css'
})
export class ManagerEventsComponent implements AfterViewInit {

  visible = false;
  eventoSeleccionado: Evento = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha: new Date(),
    ubicacion: ''
  }

  showDialog(eventoSeleccionado: Evento) {
    this.visible = true;
    this.eventoSeleccionado.id = eventoSeleccionado.id;
    this.eventoSeleccionado.nombre = eventoSeleccionado.nombre;
    this.eventoSeleccionado.descripcion = eventoSeleccionado.descripcion;
    this.eventoSeleccionado.fecha = eventoSeleccionado.fecha;
    this.eventoSeleccionado.ubicacion = eventoSeleccionado.ubicacion;
  }




  displayedColumns: string[] = [/* 'id',  */'Nombre', 'Fecha', 'Ubicacion'/* , 'Descripcion' */, 'acciones'];
  dataSource = new MatTableDataSource<Evento>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private eventsService: EventsService, private router: Router) {}

  ngOnInit() {
    this.getAllEvents();
  }

  detalleEvento(element: Evento) {

    this.router.navigate(['/detailevent'], { state: { id: element.id } });
  }

  getAllEvents(): void {
  
    this.eventsService.getAllEvents().subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.dataSource.data = response.data.map((event: any) => ({
          id: event.Id,
          nombre: event.Nombre,
          fecha: event.Fecha,
          ubicacion: event.Ubicacion,
          descripcion: event.Descripcion,
        }));
       

      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );


  }


  borrar(id : number): void {
    console.log(id);
    this.eventsService.deleteEvent(id).subscribe(
      (response) => {
        if (response) {
          console.log('Evento eliminado correctamente');
          this.getAllEvents();
        }
        
        this.visible = false;
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }







}
