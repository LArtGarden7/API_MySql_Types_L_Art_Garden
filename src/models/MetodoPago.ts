export interface MetodoPago {
    IDMetodo?: number;
    IDUsuario: number;
    NumeroTarjeta: string;
    Nombre: string;
    Apellido: string;
    Expiracion: Date;
    CodigoSeguridad: string;
}
