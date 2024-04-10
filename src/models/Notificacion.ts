export interface Notificacion {
    IDNotificacion?: number;
    IDUsuario: number;
    TipoNotificacion: string;
    MensajeNotificacion: string;
    FechaHoraNotificacion: Date;
    EstadoNotificacion: string;
}
