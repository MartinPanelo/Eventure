export class usuario {
  id?: number;
  nombre?: string;
  correo?: string;
  rol?: string;
  isLoggedIn: boolean = false;


  
  
  // Constructor opcional para inicializar las propiedades
  constructor(id?: number, nombre?: string, correo?: string, rol?: string, isLoggedIn?: boolean) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.rol = rol;
    this.isLoggedIn = false;
  }
}
