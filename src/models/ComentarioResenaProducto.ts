export interface ComentarioResenaProducto {
    IDComentario?: number;
    IDUsuario: number;
    IDProducto: number;
    TextoComentario: string;
    Puntuacion: number;
    FechaHoraComentario: Date;
}
