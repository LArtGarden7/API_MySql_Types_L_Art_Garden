import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { DireccionEnvio } from '../models/DireccionesEnvio';

// Crea una nueva dirección de envío
export const createDireccionEnvio = (req: Request, res: Response) => {
    const direccionEnvio: DireccionEnvio = req.body;
    const query = 'INSERT INTO DireccionesEnvio SET ?';

    connection.query(query, direccionEnvio, (err, result) => {
        if (err) {
            console.error('Error al crear dirección de envío:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Dirección de envío creada exitosamente', direccionID: result.insertId });
        }
    });
};

// Obtiene una dirección de envío por su ID
export const getDireccionEnvioById = (req: Request, res: Response) => {
    const direccionID = req.params.id;
    const query = 'SELECT * FROM DireccionesEnvio WHERE IDDireccion = ?';

    connection.query(query, direccionID, (err, result) => {
        if (err) {
            console.error('Error al obtener dirección de envío:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Dirección de envío no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualiza una dirección de envío existente
export const updateDireccionEnvio = (req: Request, res: Response) => {
    const direccionID = req.params.id;
    const updatedDireccion: DireccionEnvio = req.body;
    const query = 'UPDATE DireccionesEnvio SET ? WHERE IDDireccion = ?';

    connection.query(query, [updatedDireccion, direccionID], (err, result) => {
        if (err) {
            console.error('Error al actualizar dirección de envío:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Dirección de envío no encontrada' });
            } else {
                res.status(200).json({ message: 'Dirección de envío actualizada exitosamente' });
            }
        }
    });
};

// Elimina una dirección de envío existente
export const deleteDireccionEnvio = (req: Request, res: Response) => {
    const direccionID = req.params.id;
    const query = 'DELETE FROM DireccionesEnvio WHERE IDDireccion = ?';

    connection.query(query, direccionID, (err, result) => {
        if (err) {
            console.error('Error al eliminar dirección de envío:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Dirección de envío no encontrada' });
            } else {
                res.status(200).json({ message: 'Dirección de envío eliminada exitosamente' });
            }
        }
    });
};
