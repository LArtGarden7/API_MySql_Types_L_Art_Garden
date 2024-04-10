"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFotoProducto = exports.getFotoProductoById = exports.createFotoProducto = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Función para crear una nueva foto de producto
const createFotoProducto = (req, res) => {
    const fotoProducto = req.body;
    const query = 'INSERT INTO FotosProductos SET ?';
    dbconfig_1.connection.query(query, fotoProducto, (err, result) => {
        if (err) {
            console.error('Error al crear foto de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Foto de producto creada exitosamente', fotoID: result.insertId });
        }
    });
};
exports.createFotoProducto = createFotoProducto;
// Función para obtener una foto de producto por su ID
const getFotoProductoById = (req, res) => {
    const fotoID = req.params.id;
    const query = 'SELECT * FROM FotosProductos WHERE IDFoto = ?';
    dbconfig_1.connection.query(query, fotoID, (err, result) => {
        if (err) {
            console.error('Error al obtener foto de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Foto de producto no encontrada' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getFotoProductoById = getFotoProductoById;
// Función para eliminar una foto de producto
const deleteFotoProducto = (req, res) => {
    const fotoID = req.params.id;
    const query = 'DELETE FROM FotosProductos WHERE IDFoto = ?';
    dbconfig_1.connection.query(query, fotoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar foto de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Foto de producto no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Foto de producto eliminada exitosamente' });
            }
        }
    });
};
exports.deleteFotoProducto = deleteFotoProducto;
