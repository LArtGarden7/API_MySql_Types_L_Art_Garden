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

export const updateEstadoPedido = (req: Request, res: Response) => {
    const { IDPedido, IDEstado } = req.body;
    const query = 'UPDATE Pedidos SET IDEstado = ? WHERE IDPedido = ?';

    connection.query(query, [IDEstado, IDPedido], (err, result) => {
        if (err) {
            console.error('Error al actualizar el estado del pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pedido no encontrado' });
            } else {
                res.status(200).json({ message: 'Estado del pedido actualizado exitosamente' });
            }
        }
    });
};

// Función para crear un nuevo pedido
export const createPedidoPA = (req: Request, res: Response) => {
    const { idUsuario, idProducto, cantidad, idTarjetaCliente, idTarjetaVendedor, idEstado, FechaEntrega, HoraEntrega, idInventario, idPedido } = req.body;

    connection.query('CALL RealizarPedido(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [idUsuario, idProducto, cantidad, idTarjetaCliente, idTarjetaVendedor, idEstado, FechaEntrega, HoraEntrega, idInventario, idPedido], function (error, results) {
        if (error) {
            console.error('Error al realizar el pedido:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Pedido realizado exitosamente', results });
        }
    });
};

// Función para obtener un pedido por su ID de usuario
export const getPedidoByUserId = (req: Request, res: Response) => {
    const pedidoID = req.body.IDUsuario;
    const query = 'SELECT * FROM Pedidos WHERE IDUsuario = ?';

    connection.query(query, pedidoID, (err, result) => {
        if (err) {
            console.error('Error al obtener pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Pedido no encontrado' });
            } else {
                res.status(200).json(result); // Devuelve todos los registros
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

// Función para obtener pedidos por IDInventario
export const getPedidosByIdInventario = (req: Request, res: Response) => {
    const IDInventario = req.body.IDInventario;
    const query = 'SELECT * FROM Pedidos WHERE IDInventario = ?';

    connection.query(query, IDInventario, (err, results) => {
        if (err) {
            console.error('Error al obtener pedidos:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'No se encontraron pedidos para este IDInventario' });
            } else {
                res.status(200).json(results);
            }
        }
    });
};
