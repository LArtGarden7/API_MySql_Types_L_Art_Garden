import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { TarjetaCredito } from '../models/TarjetaCredito';

// Crea una nueva tarjeta de crédito
export const createTarjetaCredito = (req: Request, res: Response) => {
    const tarjeta: TarjetaCredito = req.body;
    const query = 'INSERT INTO TarjetasCredito SET ?';

    connection.query(query, tarjeta, (err, result) => {
        if (err) {
            console.error('Error al crear tarjeta:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Tarjeta creada exitosamente', tarjetaID: result.insertId });
        }
    });
};

// Obtiene una tarjeta de crédito por su ID
export const getTarjetaCreditoById = (req: Request, res: Response) => {
    const tarjetaID = req.params.id;
    const query = 'SELECT * FROM TarjetasCredito WHERE IDTarjeta = ?';

    connection.query(query, tarjetaID, (err, result) => {
        if (err) {
            console.error('Error al obtener tarjeta:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Tarjeta no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

//Obtener Tarjeta de Credito por medio de todos los datos
export const getTarjetaCreditoByData = (req: Request, res: Response) => {
    const tarjeta: TarjetaCredito = req.body;
    const query = 'SELECT * FROM TarjetasCredito WHERE IDTarjeta = ? AND IDUsuario = ? AND NumeroTarjeta = ? AND NombreTitular = ? AND ApellidoTitular = ? AND FechaExpiracion = ? AND CodigoSeguridad = ? AND Saldo = ?';

    connection.query(query, [tarjeta.IDTarjeta, tarjeta.IDUsuario, tarjeta.NumeroTarjeta, tarjeta.NombreTitular, tarjeta.ApellidoTitular, tarjeta.FechaExpiracion, tarjeta.CodigoSeguridad, tarjeta.Saldo], (err, result) => {
        if (err) {
            console.error('Error al obtener tarjeta:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Tarjeta no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualiza una tarjeta de crédito existente
export const updateTarjetaCredito = (req: Request, res: Response) => {
    const tarjetaID = req.params.id;
    const updatedTarjeta: TarjetaCredito = req.body;
    const query = 'UPDATE TarjetasCredito SET ? WHERE IDTarjeta = ?';

    connection.query(query, [updatedTarjeta, tarjetaID], (err, result) => {
        if (err) {
            console.error('Error al actualizar tarjeta:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Tarjeta no encontrada' });
            } else {
                res.status(200).json({ message: 'Tarjeta actualizada exitosamente' });
            }
        }
    });
};

// Elimina una tarjeta de crédito existente
export const deleteTarjetaCredito = (req: Request, res: Response) => {
    const tarjetaID = req.params.id;
    const query = 'DELETE FROM TarjetasCredito WHERE IDTarjeta = ?';

    connection.query(query, tarjetaID, (err, result) => {
        if (err) {
            console.error('Error al eliminar tarjeta:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Tarjeta no encontrada' });
            } else {
                res.status(200).json({ message: 'Tarjeta eliminada exitosamente' });
            }
        }
    });
};

// Obtiene todas las tarjetas de crédito
export const getAllTarjetasCredito = (req: Request, res: Response) => {
    const query = 'SELECT * FROM TarjetasCredito';

    connection.query(query, (err, result) => {
        if (err) {
            console.error('Error al obtener tarjetas:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(200).json(result);
        }
    });
};