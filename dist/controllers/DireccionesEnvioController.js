"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDireccionEnvio = exports.updateDireccionEnvio = exports.getDireccionEnvioById = exports.createDireccionEnvio = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Crea una nueva dirección de envío
const createDireccionEnvio = (req, res) => {
    const direccionEnvio = req.body;
    const query = 'INSERT INTO DireccionesEnvio SET ?';
    dbconfig_1.connection.query(query, direccionEnvio, (err, result) => {
        if (err) {
            console.error('Error al crear dirección de envío:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Dirección de envío creada exitosamente', direccionID: result.insertId });
        }
    });
};
exports.createDireccionEnvio = createDireccionEnvio;
// Obtiene una dirección de envío por su ID
const getDireccionEnvioById = (req, res) => {
    const direccionID = req.params.id;
    const query = 'SELECT * FROM DireccionesEnvio WHERE IDDireccion = ?';
    dbconfig_1.connection.query(query, direccionID, (err, result) => {
        if (err) {
            console.error('Error al obtener dirección de envío:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Dirección de envío no encontrada' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getDireccionEnvioById = getDireccionEnvioById;
// Actualiza una dirección de envío existente
const updateDireccionEnvio = (req, res) => {
    const direccionID = req.params.id;
    const updatedDireccion = req.body;
    const query = 'UPDATE DireccionesEnvio SET ? WHERE IDDireccion = ?';
    dbconfig_1.connection.query(query, [updatedDireccion, direccionID], (err, result) => {
        if (err) {
            console.error('Error al actualizar dirección de envío:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Dirección de envío no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Dirección de envío actualizada exitosamente' });
            }
        }
    });
};
exports.updateDireccionEnvio = updateDireccionEnvio;
// Elimina una dirección de envío existente
const deleteDireccionEnvio = (req, res) => {
    const direccionID = req.params.id;
    const query = 'DELETE FROM DireccionesEnvio WHERE IDDireccion = ?';
    dbconfig_1.connection.query(query, direccionID, (err, result) => {
        if (err) {
            console.error('Error al eliminar dirección de envío:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Dirección de envío no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Dirección de envío eliminada exitosamente' });
            }
        }
    });
};
exports.deleteDireccionEnvio = deleteDireccionEnvio;
