import { Evento } from './evento';

export class registro {
  id: number;
  evento: Evento;
  asistencia: boolean;

  // Constructor opcional para inicializar las propiedades
  constructor(id: number, evento: Evento, asistencia: boolean) {
    this.id = id;
    this.evento = evento;
    this.asistencia = asistencia;
  }
}

export class registroDTO {
  id: number;
  nombre: string;
  correo: string;
  asistencia: boolean;

  // Constructor opcional para inicializar las propiedades
  constructor(id: number, nombre: string, correo: string, asistencia: boolean) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.asistencia = asistencia;
  }
}
