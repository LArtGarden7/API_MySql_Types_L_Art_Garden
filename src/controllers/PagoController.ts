import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Pago } from '../models/Pago';

// Crea un nuevo pago
export const createPago = (req: Request, res: Response) => {
    const pago: Pago = req.body;
    const query = 'INSERT INTO Pagos SET ?';

    connection.query(query, pago, (err, result) => {
        if (err) {
            console.error('Error al crear pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Pago creado exitosamente', pagoID: result.insertId });
        }
    });
};

// Obtiene un pago por su ID
export const getPagoById = (req: Request, res: Response) => {
    const pagoID = req.params.id;
    const query = 'SELECT * FROM Pagos WHERE IDPago = ?';

    connection.query(query, pagoID, (err, result) => {
        if (err) {
            console.error('Error al obtener pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Pago no encontrado' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualiza un pago existente
export const updatePago = (req: Request, res: Response) => {
    const pagoID = req.params.id;
    const updatedPago: Pago = req.body;
    const query = 'UPDATE Pagos SET ? WHERE IDPago = ?';

    connection.query(query, [updatedPago, pagoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pago no encontrado' });
            } else {
                res.status(200).json({ message: 'Pago actualizado exitosamente' });
            }
        }
    });
};

// Elimina un pago existente
export const deletePago = (req: Request, res: Response) => {
    const pagoID = req.params.id;
    const query = 'DELETE FROM Pagos WHERE IDPago = ?';

    connection.query(query, pagoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pago no encontrado' });
            } else {
                res.status(200).json({ message: 'Pago eliminado exitosamente' });
            }
        }
    });
};
