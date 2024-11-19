export class Evento {
    id: number;
    nombre: string;
    fecha: Date;
    ubicacion: string;
    descripcion: string;
  
    // Constructor opcional para inicializar las propiedades
    constructor(id: number, nombre: string, fecha: Date, ubicacion: string, descripcion: string) {
      this.id = id;
      this.nombre = nombre;
      this.fecha = fecha;
      this.ubicacion = ubicacion;
      this.descripcion = descripcion;
    }
    
  }
  