"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePago = exports.updatePago = exports.getPagoById = exports.createPago = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Crea un nuevo pago
const createPago = (req, res) => {
    const pago = req.body;
    const query = 'INSERT INTO Pagos SET ?';
    dbconfig_1.connection.query(query, pago, (err, result) => {
        if (err) {
            console.error('Error al crear pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Pago creado exitosamente', pagoID: result.insertId });
        }
    });
};
exports.createPago = createPago;
// Obtiene un pago por su ID
const getPagoById = (req, res) => {
    const pagoID = req.params.id;
    const query = 'SELECT * FROM Pagos WHERE IDPago = ?';
    dbconfig_1.connection.query(query, pagoID, (err, result) => {
        if (err) {
            console.error('Error al obtener pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Pago no encontrado' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getPagoById = getPagoById;
// Actualiza un pago existente
const updatePago = (req, res) => {
    const pagoID = req.params.id;
    const updatedPago = req.body;
    const query = 'UPDATE Pagos SET ? WHERE IDPago = ?';
    dbconfig_1.connection.query(query, [updatedPago, pagoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pago no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Pago actualizado exitosamente' });
            }
        }
    });
};
exports.updatePago = updatePago;
// Elimina un pago existente
const deletePago = (req, res) => {
    const pagoID = req.params.id;
    const query = 'DELETE FROM Pagos WHERE IDPago = ?';
    dbconfig_1.connection.query(query, pagoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar pago:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Pago no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Pago eliminado exitosamente' });
            }
        }
    });
};
exports.deletePago = deletePago;
