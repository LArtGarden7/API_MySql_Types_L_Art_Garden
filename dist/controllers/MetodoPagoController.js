"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMetodoPago = exports.updateMetodoPago = exports.getMetodoPagoById = exports.createMetodoPago = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Crea un nuevo método de pago
const createMetodoPago = (req, res) => {
    const metodoPago = req.body;
    const query = 'INSERT INTO MetodosPago SET ?';
    dbconfig_1.connection.query(query, metodoPago, (err, result) => {
        if (err) {
            console.error('Error al crear método de pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Método de pago creado exitosamente', metodoPagoID: result.insertId });
        }
    });
};
exports.createMetodoPago = createMetodoPago;
// Obtiene un método de pago por su ID
const getMetodoPagoById = (req, res) => {
    const metodoPagoID = req.params.id;
    const query = 'SELECT * FROM MetodosPago WHERE IDMetodo = ?';
    dbconfig_1.connection.query(query, metodoPagoID, (err, result) => {
        if (err) {
            console.error('Error al obtener método de pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Método de pago no encontrado' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getMetodoPagoById = getMetodoPagoById;
// Actualiza un método de pago existente
const updateMetodoPago = (req, res) => {
    const metodoPagoID = req.params.id;
    const updatedMetodoPago = req.body;
    const query = 'UPDATE MetodosPago SET ? WHERE IDMetodo = ?';
    dbconfig_1.connection.query(query, [updatedMetodoPago, metodoPagoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar método de pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Método de pago no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Método de pago actualizado exitosamente' });
            }
        }
    });
};
exports.updateMetodoPago = updateMetodoPago;
// Elimina un método de pago existente
const deleteMetodoPago = (req, res) => {
    const metodoPagoID = req.params.id;
    const query = 'DELETE FROM MetodosPago WHERE IDMetodo = ?';
    dbconfig_1.connection.query(query, metodoPagoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar método de pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Método de pago no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Método de pago eliminado exitosamente' });
            }
        }
    });
};
exports.deleteMetodoPago = deleteMetodoPago;
