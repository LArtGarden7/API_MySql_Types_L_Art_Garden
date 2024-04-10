"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComentarioResenaProducto = exports.updateComentarioResenaProducto = exports.getComentarioResenaProductoById = exports.createComentarioResenaProducto = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Crea un nuevo comentario o reseña de producto
const createComentarioResenaProducto = (req, res) => {
    const comentarioResena = req.body;
    const query = 'INSERT INTO ComentariosResenasProductos SET ?';
    dbconfig_1.connection.query(query, comentarioResena, (err, result) => {
        if (err) {
            console.error('Error al crear comentario o reseña de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Comentario o reseña de producto creada exitosamente', comentarioID: result.insertId });
        }
    });
};
exports.createComentarioResenaProducto = createComentarioResenaProducto;
// Obtiene un comentario o reseña de producto por su ID
const getComentarioResenaProductoById = (req, res) => {
    const comentarioID = req.params.id;
    const query = 'SELECT * FROM ComentariosResenasProductos WHERE IDComentario = ?';
    dbconfig_1.connection.query(query, comentarioID, (err, result) => {
        if (err) {
            console.error('Error al obtener comentario o reseña de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Comentario o reseña de producto no encontrada' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getComentarioResenaProductoById = getComentarioResenaProductoById;
// Actualiza un comentario o reseña de producto existente
const updateComentarioResenaProducto = (req, res) => {
    const comentarioID = req.params.id;
    const updatedComentario = req.body;
    const query = 'UPDATE ComentariosResenasProductos SET ? WHERE IDComentario = ?';
    dbconfig_1.connection.query(query, [updatedComentario, comentarioID], (err, result) => {
        if (err) {
            console.error('Error al actualizar comentario o reseña de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Comentario o reseña de producto no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Comentario o reseña de producto actualizada exitosamente' });
            }
        }
    });
};
exports.updateComentarioResenaProducto = updateComentarioResenaProducto;
// Elimina un comentario o reseña de producto existente
const deleteComentarioResenaProducto = (req, res) => {
    const comentarioID = req.params.id;
    const query = 'DELETE FROM ComentariosResenasProductos WHERE IDComentario = ?';
    dbconfig_1.connection.query(query, comentarioID, (err, result) => {
        if (err) {
            console.error('Error al eliminar comentario o reseña de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Comentario o reseña de producto no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Comentario o reseña de producto eliminada exitosamente' });
            }
        }
    });
};
exports.deleteComentarioResenaProducto = deleteComentarioResenaProducto;
