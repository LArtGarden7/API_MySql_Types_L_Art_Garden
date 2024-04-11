// models/Floreria.ts
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
}
