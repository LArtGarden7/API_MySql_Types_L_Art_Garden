"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.updateProducto = exports.getProductoById = exports.createProducto = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Función para crear un nuevo producto
const createProducto = (req, res) => {
    const producto = req.body;
    const query = 'INSERT INTO Producto SET ?';
    dbconfig_1.connection.query(query, producto, (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Producto creado exitosamente', productoID: result.insertId });
        }
    });
};
exports.createProducto = createProducto;
// Función para obtener un producto por su ID
const getProductoById = (req, res) => {
    const productoID = req.params.id;
    const query = 'SELECT * FROM Producto WHERE IDProducto = ?';
    dbconfig_1.connection.query(query, productoID, (err, result) => {
        if (err) {
            console.error('Error al obtener producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getProductoById = getProductoById;
// Función para actualizar un producto
const updateProducto = (req, res) => {
    const productoID = req.params.id;
    const updatedProducto = req.body;
    const query = 'UPDATE Producto SET ? WHERE IDProducto = ?';
    dbconfig_1.connection.query(query, [updatedProducto, productoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Producto actualizado exitosamente' });
            }
        }
    });
};
exports.updateProducto = updateProducto;
// Función para eliminar un producto
const deleteProducto = (req, res) => {
    const productoID = req.params.id;
    const query = 'DELETE FROM Producto WHERE IDProducto = ?';
    dbconfig_1.connection.query(query, productoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
            else {
                res.status(200).json({ message: 'Producto eliminado exitosamente' });
            }
        }
    });
};
exports.deleteProducto = deleteProducto;
