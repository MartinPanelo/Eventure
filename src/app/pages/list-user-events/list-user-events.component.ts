import { Component } from '@angular/core';
import { Evento } from '../../core/models/evento';
import { RegisterService } from '../../core/services/register.service';
import { EventsService } from '../../core/services/events.service';
import { Router } from '@angular/router';
import { registro } from '../../core/models/registro';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Asistencia } from '../../core/models/asistencia';
import { ShowTService } from '../../core/services/show-t.service';

@Component({
  selector: 'app-list-user-events',
  templateUrl: 'list-user-events.component.html',
  styleUrl: './list-user-events.component.css',
})
export class ListUserEventsComponent {
  today = new Date();
  visible = false;
  registros: registro[] = [];
  EventoSeleccionado: Evento = {
    id: 0,
    nombre: '',
    descripcion: '',
    fecha: new Date(),
    ubicacion: '',
  };
  certificado: Asistencia = {
    NombreUsuario: '',
    NombreEvento: '',
    FechaEvento: new Date(),
    UbicacionEvento: '',
    DescripcionEvento: '',
  };

  constructor(
    private registerService: RegisterService,
    private eventsService: EventsService,
    private router: Router,
    private showTService: ShowTService
  ) {}

  ngOnInit() {
    this.getEventsSuscribed();
  }

  getEventsSuscribed(): void {
    this.eventsService.GetmyEventsSuscribed().subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.registros = response.data.map((registro: any) => ({
          id: registro.IdRegistro,
          evento: {
            id: registro.Id,
            nombre: registro.Nombre,
            fecha: new Date(
              registro.Fecha.toLocaleString('en-US', {
                timeZone: 'America/Argentina/Buenos_Aires',
              })
            ),
            ubicacion: registro.Ubicacion,
            descripcion: registro.Descripcion,
          },
          asistencia: registro.Asistencia,
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

  Cancelarparticipacion(id: number) {
    this.registerService.UnSetParticipacion(id).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        this.showTService.showMessage(
          'warn',
          'Exito',
          'Incripcion cancelada con exito'
        );
        this.getEventsSuscribed();
      },
      (error) => {
        this.showTService.showMessage('error', 'Error', error.error.error);
        console.error('Error en la solicitud:', error);
      }
    );
  }
  GetCertificado(id: number) {
    this.registerService.GetCertificadoParticipacion(id).subscribe(
      (response) => {
        this.certificado = response.data[0];

        this.Pdfcertificado();
      },
      (error) => {
        console.error('Error en la solicitud:', error);
      }
    );
  }
  private formatearFecha(fecha: Date): string {
    const fechaFormateada = new Date(
      fecha.toLocaleString('en-US', {
        timeZone: 'America/Argentina/Buenos_Aires',
      })
    );
    return fechaFormateada.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Para formato de 24 horas
    });
  }

  async Pdfcertificado() {
    try {
      console.log(
        new Date(
          this.certificado.FechaEvento.toLocaleString('en-US', {
            timeZone: 'America/Argentina/Buenos_Aires',
          })
        )
      );

      // Cargar el PDF

      const pdfUrl = '/assets/PresentationAngular.pdf'; // Ruta del PDF base
      const existingPdfBytes = await fetch(pdfUrl).then((res) =>
        res.arrayBuffer()
      );

      // Cargar el PDF en PDF-LIB
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const helveticaFont = await pdfDoc.embedFont(
        StandardFonts.TimesRomanBoldItalic
      );
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      firstPage.drawText(this.certificado.NombreUsuario, {
        x: 395,
        y: height - 5 * 40,
        size: 40,
        font: helveticaFont,
        color: rgb(1, 0.341, 0.2),
        rotate: degrees(0),
      });
      firstPage.drawText(this.certificado.NombreEvento, {
        x: 395,
        y: height - 5 * 60,
        size: 30,
        font: helveticaFont,
        color: rgb(1, 0.341, 0.2),
        rotate: degrees(0),
      });

      firstPage.drawText(this.formatearFecha(this.certificado.FechaEvento), {
        x: 395,
        y: height - 5 * 75,
        size: 20,
        font: helveticaFont,
        color: rgb(1, 0.541, 0.5),
        rotate: degrees(0),
      });
      firstPage.drawText(this.certificado.UbicacionEvento, {
        x: 395,
        y: height - 5 * 80,
        size: 20,
        font: helveticaFont,
        color: rgb(1, 0.541, 0.5),
        rotate: degrees(0),
      });
      firstPage.drawText(this.certificado.DescripcionEvento, {
        x: 395,
        y: height - 5 * 85,
        size: 20,
        font: helveticaFont,
        color: rgb(1, 0.541, 0.5),
        rotate: degrees(0),
      });

      const pdfBytes = await pdfDoc.save();
      // Crear un Blob con los bytes del PDF y generar un enlace para descargarlo
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Certificado_De_Participacion.pdf'; // Nombre del archivo
      link.click();
      this.showTService.showMessage('success', 'Exito', "Certificado generado con exito");
    } catch (error) {
      console.error('Error al generar el certificado:', error);
      this.showTService.showMessage('error', 'Error', "Error al generar el certificado");
    }
  }
}
