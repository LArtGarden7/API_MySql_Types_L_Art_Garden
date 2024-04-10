"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCancelacion = exports.updateCancelacion = exports.getCancelacionById = exports.createCancelacion = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Crea una nueva cancelación
const createCancelacion = (req, res) => {
    const cancelacion = req.body;
    const query = 'INSERT INTO Cancelaciones SET ?';
    dbconfig_1.connection.query(query, cancelacion, (err, result) => {
        if (err) {
            console.error('Error al crear cancelación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Cancelación creada exitosamente', cancelacionID: result.insertId });
        }
    });
};
exports.createCancelacion = createCancelacion;
// Obtiene una cancelación por su ID
const getCancelacionById = (req, res) => {
    const cancelacionID = req.params.id;
    const query = 'SELECT * FROM Cancelaciones WHERE IDCancelacion = ?';
    dbconfig_1.connection.query(query, cancelacionID, (err, result) => {
        if (err) {
            console.error('Error al obtener cancelación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Cancelación no encontrada' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getCancelacionById = getCancelacionById;
// Actualiza una cancelación existente
const updateCancelacion = (req, res) => {
    const cancelacionID = req.params.id;
    const updatedCancelacion = req.body;
    const query = 'UPDATE Cancelaciones SET ? WHERE IDCancelacion = ?';
    dbconfig_1.connection.query(query, [updatedCancelacion, cancelacionID], (err, result) => {
        if (err) {
            console.error('Error al actualizar cancelación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Cancelación no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Cancelación actualizada exitosamente' });
            }
        }
    });
};
exports.updateCancelacion = updateCancelacion;
// Elimina una cancelación existente
const deleteCancelacion = (req, res) => {
    const cancelacionID = req.params.id;
    const query = 'DELETE FROM Cancelaciones WHERE IDCancelacion = ?';
    dbconfig_1.connection.query(query, cancelacionID, (err, result) => {
        if (err) {
            console.error('Error al eliminar cancelación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Cancelación no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Cancelación eliminada exitosamente' });
            }
        }
    });
};
exports.deleteCancelacion = deleteCancelacion;
