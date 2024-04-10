"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEstado = exports.updateEstado = exports.getEstadoById = exports.createEstado = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Crea un nuevo estado
const createEstado = (req, res) => {
    const estado = req.body;
    const query = 'INSERT INTO Estados SET ?';
    dbconfig_1.connection.query(query, estado, (err, result) => {
        if (err) {
            console.error('Error al crear estado:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Estado creado exitosamente', estadoID: result.insertId });
        }
    });
};
exports.createEstado = createEstado;
// Obtiene un estado por su ID
const getEstadoById = (req, res) => {
    const estadoID = req.params.id;
    const query = 'SELECT * FROM Estados WHERE IDEstado = ?';
    dbconfig_1.connection.query(query, estadoID, (err, result) => {
        if (err) {
            console.error('Error al obtener estado:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Estado no encontrado' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getEstadoById = getEstadoById;
// Actualiza un estado existente
const updateEstado = (req, res) => {
    const estadoID = req.params.id;
    const updatedEstado = req.body;
    const query = 'UPDATE Estados SET ? WHERE IDEstado = ?';
    dbconfig_1.connection.query(query, [updatedEstado, estadoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar estado:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Estado no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Estado actualizado exitosamente' });
            }
        }
    });
};
exports.updateEstado = updateEstado;
// Elimina un estado existente
const deleteEstado = (req, res) => {
    const estadoID = req.params.id;
    const query = 'DELETE FROM Estados WHERE IDEstado = ?';
    dbconfig_1.connection.query(query, estadoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar estado:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Estado no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Estado eliminado exitosamente' });
            }
        }
    });
};
exports.deleteEstado = deleteEstado;
