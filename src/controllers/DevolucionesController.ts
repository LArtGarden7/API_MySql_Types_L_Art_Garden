import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Devolucion } from '../models/Devoluciones';

// Crea una nueva devolución
export const createDevolucion = (req: Request, res: Response) => {
    const devolucion: Devolucion = req.body;
    const query = 'INSERT INTO Devoluciones SET ?';

    connection.query(query, devolucion, (err, result) => {
        if (err) {
            console.error('Error al crear devolución:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Devolución creada exitosamente', devolucionID: result.insertId });
        }
    });
};

// Obtiene una devolución por su ID
export const getDevolucionById = (req: Request, res: Response) => {
    const devolucionID = req.params.id;
    const query = 'SELECT * FROM Devoluciones WHERE IDDevolucion = ?';

    connection.query(query, devolucionID, (err, result) => {
        if (err) {
            console.error('Error al obtener devolución:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Devolución no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualiza una devolución existente
export const updateDevolucion = (req: Request, res: Response) => {
    const devolucionID = req.params.id;
    const updatedDevolucion: Devolucion = req.body;
    const query = 'UPDATE Devoluciones SET ? WHERE IDDevolucion = ?';

    connection.query(query, [updatedDevolucion, devolucionID], (err, result) => {
        if (err) {
            console.error('Error al actualizar devolución:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Devolución no encontrada' });
            } else {
                res.status(200).json({ message: 'Devolución actualizada exitosamente' });
            }
        }
    });
};

// Elimina una devolución existente
export const deleteDevolucion = (req: Request, res: Response) => {
    const devolucionID = req.params.id;
    const query = 'DELETE FROM Devoluciones WHERE IDDevolucion = ?';

    connection.query(query, devolucionID, (err, result) => {
        if (err) {
            console.error('Error al eliminar devolución:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Devolución no encontrada' });
            } else {
                res.status(200).json({ message: 'Devolución eliminada exitosamente' });
            }
        }
    });
};
