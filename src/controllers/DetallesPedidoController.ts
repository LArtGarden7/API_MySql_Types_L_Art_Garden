import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { DetallePedido } from '../models/DetallesPedido';

// Crear un nuevo detalle de pedido
export const createDetallePedido = (req: Request, res: Response) => {
    const detallePedido: DetallePedido = req.body;
    const query = 'INSERT INTO DetallesPedido SET ?';

    connection.query(query, detallePedido, (err, result) => {
        if (err) {
            console.error('Error al crear detalle de pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Detalle de pedido creado exitosamente', detallePedidoID: result.insertId });
        }
    });
};

// Obtener un detalle de pedido por su ID
export const getDetallePedidoById = (req: Request, res: Response) => {
    const detallePedidoID = req.params.id;
    const query = 'SELECT * FROM DetallesPedido WHERE IDDetalle = ?';

    connection.query(query, detallePedidoID, (err, result) => {
        if (err) {
            console.error('Error al obtener detalle de pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Detalle de pedido no encontrado' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualizar un detalle de pedido por su ID
export const updateDetallePedido = (req: Request, res: Response) => {
    const detallePedidoID = req.params.id;
    const updatedDetallePedido: DetallePedido = req.body;
    const query = 'UPDATE DetallesPedido SET ? WHERE IDDetalle = ?';

    connection.query(query, [updatedDetallePedido, detallePedidoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar detalle de pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Detalle de pedido no encontrado' });
            } else {
                res.status(200).json({ message: 'Detalle de pedido actualizado exitosamente' });
            }
        }
    });
};

// Eliminar un detalle de pedido por su ID
export const deleteDetallePedido = (req: Request, res: Response) => {
    const detallePedidoID = req.params.id;
    const query = 'DELETE FROM DetallesPedido WHERE IDDetalle = ?';

    connection.query(query, detallePedidoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar detalle de pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Detalle de pedido no encontrado' });
            } else {
                res.status(200).json({ message: 'Detalle de pedido eliminado exitosamente' });
            }
        }
    });
};
