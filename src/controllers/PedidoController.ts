import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Pedido } from '../models/Pedido';

// Función para crear un nuevo pedido
export const createPedido = (req: Request, res: Response) => {
    const pedido: Pedido = req.body;
    const query = 'INSERT INTO Pedidos SET ?';

    connection.query(query, pedido, (err, result) => {
        if (err) {
            console.error('Error al crear pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Pedido creado exitosamente', pedidoID: result.insertId });
        }
    });
};

// Función para obtener un pedido por su ID
export const getPedidoById = (req: Request, res: Response) => {
    const pedidoID = req.params.id;
    const query = 'SELECT * FROM Pedidos WHERE IDPedido = ?';

    connection.query(query, pedidoID, (err, result) => {
        if (err) {
            console.error('Error al obtener pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Pedido no encontrado' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Función para actualizar un pedido
export const updatePedido = (req: Request, res: Response) => {
    const pedidoID = req.params.id;
    const updatedPedido: Pedido = req.body;
    const query = 'UPDATE Pedidos SET ? WHERE IDPedido = ?';

    connection.query(query, [updatedPedido, pedidoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pedido no encontrado' });
            } else {
                res.status(200).json({ message: 'Pedido actualizado exitosamente' });
            }
        }
    });
};

// Función para eliminar un pedido
export const deletePedido = (req: Request, res: Response) => {
    const pedidoID = req.params.id;
    const query = 'DELETE FROM Pedidos WHERE IDPedido = ?';

    connection.query(query, pedidoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pedido no encontrado' });
            } else {
                res.status(200).json({ message: 'Pedido eliminado exitosamente' });
            }
        }
    });
};
