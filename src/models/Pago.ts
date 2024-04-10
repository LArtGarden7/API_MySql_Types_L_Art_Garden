export interface Pago {
    IDPago?: number;
    IDUsuario: number;
    IDPedido: number;
    IDMetodo: number;
    FechaHoraPago: Date;
    MontoTotalPagado: number;
    IDEstado: number;
}
