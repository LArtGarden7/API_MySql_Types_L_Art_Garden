"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoriaProducto = exports.updateCategoriaProducto = exports.getCategoriaProductoById = exports.createCategoriaProducto = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Función para crear una nueva categoría de producto
const createCategoriaProducto = (req, res) => {
    const categoriaProducto = req.body;
    const query = 'INSERT INTO CategoriasProductos SET ?';
    dbconfig_1.connection.query(query, categoriaProducto, (err, result) => {
        if (err) {
            console.error('Error al crear categoría de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Categoría de producto creada exitosamente', categoriaID: result.insertId });
        }
    });
};
exports.createCategoriaProducto = createCategoriaProducto;
// Función para obtener una categoría de producto por su ID
const getCategoriaProductoById = (req, res) => {
    const categoriaID = req.params.id;
    const query = 'SELECT * FROM CategoriasProductos WHERE ID = ?';
    dbconfig_1.connection.query(query, categoriaID, (err, result) => {
        if (err) {
            console.error('Error al obtener categoría de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Categoría de producto no encontrada' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getCategoriaProductoById = getCategoriaProductoById;
// Función para actualizar una categoría de producto
const updateCategoriaProducto = (req, res) => {
    const categoriaID = req.params.id;
    const updatedCategoriaProducto = req.body;
    const query = 'UPDATE CategoriasProductos SET ? WHERE ID = ?';
    dbconfig_1.connection.query(query, [updatedCategoriaProducto, categoriaID], (err, result) => {
        if (err) {
            console.error('Error al actualizar categoría de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Categoría de producto no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Categoría de producto actualizada exitosamente' });
            }
        }
    });
};
exports.updateCategoriaProducto = updateCategoriaProducto;
// Función para eliminar una categoría de producto
const deleteCategoriaProducto = (req, res) => {
    const categoriaID = req.params.id;
    const query = 'DELETE FROM CategoriasProductos WHERE ID = ?';
    dbconfig_1.connection.query(query, categoriaID, (err, result) => {
        if (err) {
            console.error('Error al eliminar categoría de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Categoría de producto no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Categoría de producto eliminada exitosamente' });
            }
        }
    });
};
exports.deleteCategoriaProducto = deleteCategoriaProducto;
