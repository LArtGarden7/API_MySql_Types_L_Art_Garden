import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Cancelacion } from '../models/Cancelaciones';

// Crea una nueva cancelación
export const createCancelacion = (req: Request, res: Response) => {
    const cancelacion: Cancelacion = req.body;
    const query = 'INSERT INTO Cancelaciones SET ?';

    connection.query(query, cancelacion, (err, result) => {
        if (err) {
            console.error('Error al crear cancelación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Cancelación creada exitosamente', cancelacionID: result.insertId });
        }
    });
};

// Obtiene una cancelación por su ID
export const getCancelacionById = (req: Request, res: Response) => {
    const cancelacionID = req.params.id;
    const query = 'SELECT * FROM Cancelaciones WHERE IDCancelacion = ?';

    connection.query(query, cancelacionID, (err, result) => {
        if (err) {
            console.error('Error al obtener cancelación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Cancelación no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualiza una cancelación existente
export const updateCancelacion = (req: Request, res: Response) => {
    const cancelacionID = req.params.id;
    const updatedCancelacion: Cancelacion = req.body;
    const query = 'UPDATE Cancelaciones SET ? WHERE IDCancelacion = ?';

    connection.query(query, [updatedCancelacion, cancelacionID], (err, result) => {
        if (err) {
            console.error('Error al actualizar cancelación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Cancelación no encontrada' });
            } else {
                res.status(200).json({ message: 'Cancelación actualizada exitosamente' });
            }
        }
    });
};

// Elimina una cancelación existente
export const deleteCancelacion = (req: Request, res: Response) => {
    const cancelacionID = req.params.id;
    const query = 'DELETE FROM Cancelaciones WHERE IDCancelacion = ?';

    connection.query(query, cancelacionID, (err, result) => {
        if (err) {
            console.error('Error al eliminar cancelación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Cancelación no encontrada' });
            } else {
                res.status(200).json({ message: 'Cancelación eliminada exitosamente' });
            }
        }
    });
};
