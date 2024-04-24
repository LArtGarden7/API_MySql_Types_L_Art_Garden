export interface Floreria {
    ID: number;
    IDUsuario: number;
    NombreFloreria: string;
    Descripcion: string;
    Direccion: string;
    Telefono: string;
    CorreoElectronico: string;
    RedesSociales: string;
    Foto?: string;
    HoraApertura: string;
    HoraCierre: string;
    Longitud: number;
    Latitud: number;
    EstadoFloreria: boolean;
}