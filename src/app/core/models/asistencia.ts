export class Asistencia {
  NombreUsuario: string;
  NombreEvento: string;
  FechaEvento: Date;
  UbicacionEvento: string;
  DescripcionEvento: string;

  // Constructor opcional para inicializar las propiedades
  constructor(
    NombreUsuario: string,
    NombreEvento: string,
    FechaEvento: Date,
    UbicacionEvento: string,
    DescripcionEvento: string
  ) {
    this.NombreUsuario = NombreUsuario;
    this.NombreEvento = NombreEvento;
    this.FechaEvento = FechaEvento;
    this.UbicacionEvento = UbicacionEvento;
    this.DescripcionEvento = DescripcionEvento;
  }
}
