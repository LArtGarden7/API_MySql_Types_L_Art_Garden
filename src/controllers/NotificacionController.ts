import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Notificacion } from '../models/Notificacion';

// Crea una nueva notificación
export const createNotificacion = (req: Request, res: Response) => {
    const notificacion: Notificacion = req.body;
    const query = 'INSERT INTO Notificaciones SET ?';

    connection.query(query, notificacion, (err, result) => {
        if (err) {
            console.error('Error al crear notificación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Notificación creada exitosamente', notificacionID: result.insertId });
        }
    });
};

// Obtiene una notificación por su ID
export const getNotificacionById = (req: Request, res: Response) => {
    const notificacionID = req.params.id;
    const query = 'SELECT * FROM Notificaciones WHERE IDNotificacion = ?';

    connection.query(query, notificacionID, (err, result) => {
        if (err) {
            console.error('Error al obtener notificación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Notificación no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualiza una notificación existente
export const updateNotificacion = (req: Request, res: Response) => {
    const notificacionID = req.params.id;
    const updatedNotificacion: Notificacion = req.body;
    const query = 'UPDATE Notificaciones SET ? WHERE IDNotificacion = ?';

    connection.query(query, [updatedNotificacion, notificacionID], (err, result) => {
        if (err) {
            console.error('Error al actualizar notificación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Notificación no encontrada' });
            } else {
                res.status(200).json({ message: 'Notificación actualizada exitosamente' });
            }
        }
    });
};

// Elimina una notificación existente
export const deleteNotificacion = (req: Request, res: Response) => {
    const notificacionID = req.params.id;
    const query = 'DELETE FROM Notificaciones WHERE IDNotificacion = ?';

    connection.query(query, notificacionID, (err, result) => {
        if (err) {
            console.error('Error al eliminar notificación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Notificación no encontrada' });
            } else {
                res.status(200).json({ message: 'Notificación eliminada exitosamente' });
            }
        }
    });
};
