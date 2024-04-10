"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventario = exports.updateInventario = exports.getInventarioById = exports.createInventario = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Función para crear un nuevo registro en el inventario
const createInventario = (req, res) => {
    const inventario = req.body;
    const query = 'INSERT INTO Inventario SET ?';
    dbconfig_1.connection.query(query, inventario, (err, result) => {
        if (err) {
            console.error('Error al crear inventario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Inventario creado exitosamente', inventarioID: result.insertId });
        }
    });
};
exports.createInventario = createInventario;
// Función para obtener un registro de inventario por su ID
const getInventarioById = (req, res) => {
    const inventarioID = req.params.id;
    const query = 'SELECT * FROM Inventario WHERE IDInventario = ?';
    dbconfig_1.connection.query(query, inventarioID, (err, result) => {
        if (err) {
            console.error('Error al obtener inventario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Inventario no encontrado' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getInventarioById = getInventarioById;
// Función para actualizar un registro de inventario
const updateInventario = (req, res) => {
    const inventarioID = req.params.id;
    const updatedInventario = req.body;
    const query = 'UPDATE Inventario SET ? WHERE IDInventario = ?';
    dbconfig_1.connection.query(query, [updatedInventario, inventarioID], (err, result) => {
        if (err) {
            console.error('Error al actualizar inventario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Inventario no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Inventario actualizado exitosamente' });
            }
        }
    });
};
exports.updateInventario = updateInventario;
// Función para eliminar un registro de inventario
const deleteInventario = (req, res) => {
    const inventarioID = req.params.id;
    const query = 'DELETE FROM Inventario WHERE IDInventario = ?';
    dbconfig_1.connection.query(query, inventarioID, (err, result) => {
        if (err) {
            console.error('Error al eliminar inventario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Inventario no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Inventario eliminado exitosamente' });
            }
        }
    });
};
exports.deleteInventario = deleteInventario;
