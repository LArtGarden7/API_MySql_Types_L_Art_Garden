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
    Longitud: number;
    Latitud: number;
    Direccion1: string;
    Direccion2: string;
    Direccion3: string;
}