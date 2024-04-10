// models/User.ts
export interface User {
    ID: number;
    NombreUsuario: string;
    FechaNacimiento: Date;
    Genero: string;
    Telefono: string;
    CorreoElectronico: string;
    Contrasenia: string;
    TipoUsuarioID: number;
    Foto?: string;
}