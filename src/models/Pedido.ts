export interface Pedido {
  IDPedido?: number;
  IDUsuario?: number;
  FechaHoraPedido?: Date;
  PagoTotal?: number;
  IdEstado?: number;
  IDProducto?: number;
  CantidadProducto?: number;
  IDTarjeta?: number;
  PrecioUnitario?: number;
  PrecioTotal?: number;
  IDInventario?: number;
  IDDetallePedido?: number;
  FechaEntrega?: Date;
  HoraEntrega?: string;
  ImagenReferencia?: string;
}