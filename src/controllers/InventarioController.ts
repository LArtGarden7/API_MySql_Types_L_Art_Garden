import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Inventario } from '../models/Inventario';

// Función para crear un nuevo registro en el inventario
export const createInventario = (req: Request, res: Response) => {
    const inventario: Inventario = req.body;
    const query = 'INSERT INTO Inventario SET ?';

    connection.query(query, inventario, (err, result) => {
        if (err) {
            console.error('Error al crear inventario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Inventario creado exitosamente', inventarioID: result.insertId });
        }
    });
};

// Función para obtener un registro de inventario por su ID
export const getInventarioById = (req: Request, res: Response) => {
    const inventarioID = req.params.id;
    const query = 'SELECT * FROM Inventario WHERE IDInventario = ?';

    connection.query(query, inventarioID, (err, result) => {
        if (err) {
            console.error('Error al obtener inventario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Inventario no encontrado' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Función para actualizar un registro de inventario
export const updateInventario = (req: Request, res: Response) => {
    const inventarioID = req.params.id;
    const updatedInventario: Inventario = req.body;
    const query = 'UPDATE Inventario SET ? WHERE IDInventario = ?';

    connection.query(query, [updatedInventario, inventarioID], (err, result) => {
        if (err) {
            console.error('Error al actualizar inventario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Inventario no encontrado' });
            } else {
                res.status(200).json({ message: 'Inventario actualizado exitosamente' });
            }
        }
    });
};

// Función para eliminar un registro de inventario
export const deleteInventario = (req: Request, res: Response) => {
    const inventarioID = req.params.id;
    const query = 'DELETE FROM Inventario WHERE IDInventario = ?';

    connection.query(query, inventarioID, (err, result) => {
        if (err) {
            console.error('Error al eliminar inventario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Inventario no encontrado' });
            } else {
                res.status(200).json({ message: 'Inventario eliminado exitosamente' });
            }
        }
    });
};
