import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Estado } from '../models/Estado';

// Crea un nuevo estado
export const createEstado = (req: Request, res: Response) => {
    const estado: Estado = req.body;
    const query = 'INSERT INTO Estados SET ?';

    connection.query(query, estado, (err, result) => {
        if (err) {
            console.error('Error al crear estado:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Estado creado exitosamente', estadoID: result.insertId });
        }
    });
};

// Obtiene un estado por su ID
export const getEstadoById = (req: Request, res: Response) => {
    const estadoID = req.params.id;
    const query = 'SELECT * FROM Estados WHERE IDEstado = ?';

    connection.query(query, estadoID, (err, result) => {
        if (err) {
            console.error('Error al obtener estado:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Estado no encontrado' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualiza un estado existente
export const updateEstado = (req: Request, res: Response) => {
    const estadoID = req.params.id;
    const updatedEstado: Estado = req.body;
    const query = 'UPDATE Estados SET ? WHERE IDEstado = ?';

    connection.query(query, [updatedEstado, estadoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar estado:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Estado no encontrado' });
            } else {
                res.status(200).json({ message: 'Estado actualizado exitosamente' });
            }
        }
    });
};

// Elimina un estado existente
export const deleteEstado = (req: Request, res: Response) => {
    const estadoID = req.params.id;
    const query = 'DELETE FROM Estados WHERE IDEstado = ?';

    connection.query(query, estadoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar estado:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Estado no encontrado' });
            } else {
                res.status(200).json({ message: 'Estado eliminado exitosamente' });
            }
        }
    });
};
