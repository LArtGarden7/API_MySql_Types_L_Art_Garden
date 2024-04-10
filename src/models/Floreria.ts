// models/Floreria.ts
export interface Floreria {
    ID: number;
    IDUsuario: number;                       //Esta  variable debe ser autoincremental en la base de datos
    NombreFloreria: string;
    Descripcion: string;
    Direccion: string;
    Telefono: string;
    CorreoElectronico: string;
    RedesSociales: string;
    Foto: string; // Opcionalmente puedes usar un string si estás almacenando la URL de la imagen
}
