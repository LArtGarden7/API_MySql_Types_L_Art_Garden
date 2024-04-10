"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDevolucion = exports.updateDevolucion = exports.getDevolucionById = exports.createDevolucion = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Crea una nueva devolución
const createDevolucion = (req, res) => {
    const devolucion = req.body;
    const query = 'INSERT INTO Devoluciones SET ?';
    dbconfig_1.connection.query(query, devolucion, (err, result) => {
        if (err) {
            console.error('Error al crear devolución:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Devolución creada exitosamente', devolucionID: result.insertId });
        }
    });
};
exports.createDevolucion = createDevolucion;
// Obtiene una devolución por su ID
const getDevolucionById = (req, res) => {
    const devolucionID = req.params.id;
    const query = 'SELECT * FROM Devoluciones WHERE IDDevolucion = ?';
    dbconfig_1.connection.query(query, devolucionID, (err, result) => {
        if (err) {
            console.error('Error al obtener devolución:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Devolución no encontrada' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getDevolucionById = getDevolucionById;
// Actualiza una devolución existente
const updateDevolucion = (req, res) => {
    const devolucionID = req.params.id;
    const updatedDevolucion = req.body;
    const query = 'UPDATE Devoluciones SET ? WHERE IDDevolucion = ?';
    dbconfig_1.connection.query(query, [updatedDevolucion, devolucionID], (err, result) => {
        if (err) {
            console.error('Error al actualizar devolución:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Devolución no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Devolución actualizada exitosamente' });
            }
        }
    });
};
exports.updateDevolucion = updateDevolucion;
// Elimina una devolución existente
const deleteDevolucion = (req, res) => {
    const devolucionID = req.params.id;
    const query = 'DELETE FROM Devoluciones WHERE IDDevolucion = ?';
    dbconfig_1.connection.query(query, devolucionID, (err, result) => {
        if (err) {
            console.error('Error al eliminar devolución:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Devolución no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Devolución eliminada exitosamente' });
            }
        }
    });
};
exports.deleteDevolucion = deleteDevolucion;
