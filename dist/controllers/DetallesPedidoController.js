"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDetallePedido = exports.updateDetallePedido = exports.getDetallePedidoById = exports.createDetallePedido = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Crear un nuevo detalle de pedido
const createDetallePedido = (req, res) => {
    const detallePedido = req.body;
    const query = 'INSERT INTO DetallesPedido SET ?';
    dbconfig_1.connection.query(query, detallePedido, (err, result) => {
        if (err) {
            console.error('Error al crear detalle de pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Detalle de pedido creado exitosamente', detallePedidoID: result.insertId });
        }
    });
};
exports.createDetallePedido = createDetallePedido;
// Obtener un detalle de pedido por su ID
const getDetallePedidoById = (req, res) => {
    const detallePedidoID = req.params.id;
    const query = 'SELECT * FROM DetallesPedido WHERE IDDetalle = ?';
    dbconfig_1.connection.query(query, detallePedidoID, (err, result) => {
        if (err) {
            console.error('Error al obtener detalle de pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Detalle de pedido no encontrado' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getDetallePedidoById = getDetallePedidoById;
// Actualizar un detalle de pedido por su ID
const updateDetallePedido = (req, res) => {
    const detallePedidoID = req.params.id;
    const updatedDetallePedido = req.body;
    const query = 'UPDATE DetallesPedido SET ? WHERE IDDetalle = ?';
    dbconfig_1.connection.query(query, [updatedDetallePedido, detallePedidoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar detalle de pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Detalle de pedido no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Detalle de pedido actualizado exitosamente' });
            }
        }
    });
};
exports.updateDetallePedido = updateDetallePedido;
// Eliminar un detalle de pedido por su ID
const deleteDetallePedido = (req, res) => {
    const detallePedidoID = req.params.id;
    const query = 'DELETE FROM DetallesPedido WHERE IDDetalle = ?';
    dbconfig_1.connection.query(query, detallePedidoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar detalle de pedido:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Detalle de pedido no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Detalle de pedido eliminado exitosamente' });
            }
        }
    });
};
exports.deleteDetallePedido = deleteDetallePedido;
