"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFloreria = exports.updateFloreria = exports.getFloreriaById = exports.createFloreria = void 0;
const dbconfig_1 = require("../config/dbconfig");
const createFloreria = (req, res) => {
    const floreria = req.body;
    const query = 'INSERT INTO Florerias SET ?';
    dbconfig_1.connection.query(query, floreria, (err, result) => {
        if (err) {
            console.error('Error al crear florería:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Florería creada exitosamente', floreriaID: result.insertId });
        }
    });
};
exports.createFloreria = createFloreria;
const getFloreriaById = (req, res) => {
    const floreriaID = req.params.id;
    const query = 'SELECT * FROM Florerias WHERE ID = ?';
    dbconfig_1.connection.query(query, floreriaID, (err, result) => {
        if (err) {
            console.error('Error al obtener florería:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Florería no encontrada' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getFloreriaById = getFloreriaById;
const updateFloreria = (req, res) => {
    const floreriaID = req.params.id;
    const updatedFloreria = req.body;
    const query = 'UPDATE Florerias SET ? WHERE ID = ?';
    dbconfig_1.connection.query(query, [updatedFloreria, floreriaID], (err, result) => {
        if (err) {
            console.error('Error al actualizar florería:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Florería no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Florería actualizada exitosamente' });
            }
        }
    });
};
exports.updateFloreria = updateFloreria;
const deleteFloreria = (req, res) => {
    const floreriaID = req.params.id;
    const query = 'DELETE FROM Florerias WHERE ID = ?';
    dbconfig_1.connection.query(query, floreriaID, (err, result) => {
        if (err) {
            console.error('Error al eliminar florería:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Florería no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Florería eliminada exitosamente' });
            }
        }
    });
};
exports.deleteFloreria = deleteFloreria;
