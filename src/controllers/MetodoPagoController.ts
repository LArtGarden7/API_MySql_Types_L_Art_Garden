import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { MetodoPago } from '../models/MetodoPago';

// Crea un nuevo método de pago
export const createMetodoPago = (req: Request, res: Response) => {
    const metodoPago: MetodoPago = req.body;
    const query = 'INSERT INTO MetodosPago SET ?';

    connection.query(query, metodoPago, (err, result) => {
        if (err) {
            console.error('Error al crear método de pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Método de pago creado exitosamente', metodoPagoID: result.insertId });
        }
    });
};

// Obtiene un método de pago por su ID
export const getMetodoPagoById = (req: Request, res: Response) => {
    const metodoPagoID = req.params.id;
    const query = 'SELECT * FROM MetodosPago WHERE IDMetodo = ?';

    connection.query(query, metodoPagoID, (err, result) => {
        if (err) {
            console.error('Error al obtener método de pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Método de pago no encontrado' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualiza un método de pago existente
export const updateMetodoPago = (req: Request, res: Response) => {
    const metodoPagoID = req.params.id;
    const updatedMetodoPago: MetodoPago = req.body;
    const query = 'UPDATE MetodosPago SET ? WHERE IDMetodo = ?';

    connection.query(query, [updatedMetodoPago, metodoPagoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar método de pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Método de pago no encontrado' });
            } else {
                res.status(200).json({ message: 'Método de pago actualizado exitosamente' });
            }
        }
    });
};

// Elimina un método de pago existente
export const deleteMetodoPago = (req: Request, res: Response) => {
    const metodoPagoID = req.params.id;
    const query = 'DELETE FROM MetodosPago WHERE IDMetodo = ?';

    connection.query(query, metodoPagoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar método de pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Método de pago no encontrado' });
            } else {
                res.status(200).json({ message: 'Método de pago eliminado exitosamente' });
            }
        }
    });
};
