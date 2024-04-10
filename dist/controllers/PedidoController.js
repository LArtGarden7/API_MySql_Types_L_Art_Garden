"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePedido = exports.updatePedido = exports.getPedidoById = exports.createPedido = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Función para crear un nuevo pedido
const createPedido = (req, res) => {
    const pedido = req.body;
    const query = 'INSERT INTO Pedidos SET ?';
    dbconfig_1.connection.query(query, pedido, (err, result) => {
        if (err) {
            console.error('Error al crear pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Pedido creado exitosamente', pedidoID: result.insertId });
        }
    });
};
exports.createPedido = createPedido;
// Función para obtener un pedido por su ID
const getPedidoById = (req, res) => {
    const pedidoID = req.params.id;
    const query = 'SELECT * FROM Pedidos WHERE IDPedido = ?';
    dbconfig_1.connection.query(query, pedidoID, (err, result) => {
        if (err) {
            console.error('Error al obtener pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Pedido no encontrado' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getPedidoById = getPedidoById;
// Función para actualizar un pedido
const updatePedido = (req, res) => {
    const pedidoID = req.params.id;
    const updatedPedido = req.body;
    const query = 'UPDATE Pedidos SET ? WHERE IDPedido = ?';
    dbconfig_1.connection.query(query, [updatedPedido, pedidoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pedido no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Pedido actualizado exitosamente' });
            }
        }
    });
};
exports.updatePedido = updatePedido;
// Función para eliminar un pedido
const deletePedido = (req, res) => {
    const pedidoID = req.params.id;
    const query = 'DELETE FROM Pedidos WHERE IDPedido = ?';
    dbconfig_1.connection.query(query, pedidoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pedido no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Pedido eliminado exitosamente' });
            }
        }
    });
};
exports.deletePedido = deletePedido;
