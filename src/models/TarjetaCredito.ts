// models/TarjetaCredito.ts
export interface TarjetaCredito {
    IDTarjeta: number;
    IDUsuario: number;
    NumeroTarjeta: string;
    NombreTitular: string;
    ApellidoTitular: string;
    FechaExpiracion: Date;
    CodigoSeguridad: string;
    Saldo: number;
}