import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { ComentarioResenaProducto } from '../models/ComentarioResenaProducto';

// Crea un nuevo comentario o reseña de producto
export const createComentarioResenaProducto = (req: Request, res: Response) => {
    const comentarioResena: ComentarioResenaProducto = req.body;
    const query = 'INSERT INTO ComentariosResenasProductos SET ?';

    connection.query(query, comentarioResena, (err, result) => {
        if (err) {
            console.error('Error al crear comentario o reseña de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Comentario o reseña de producto creada exitosamente', comentarioID: result.insertId });
        }
    });
};

// Obtiene un comentario o reseña de producto por su ID
export const getComentarioResenaProductoById = (req: Request, res: Response) => {
    const comentarioID = req.params.id;
    const query = 'SELECT * FROM ComentariosResenasProductos WHERE IDComentario = ?';

    connection.query(query, comentarioID, (err, result) => {
        if (err) {
            console.error('Error al obtener comentario o reseña de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Comentario o reseña de producto no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Actualiza un comentario o reseña de producto existente
export const updateComentarioResenaProducto = (req: Request, res: Response) => {
    const comentarioID = req.params.id;
    const updatedComentario: ComentarioResenaProducto = req.body;
    const query = 'UPDATE ComentariosResenasProductos SET ? WHERE IDComentario = ?';

    connection.query(query, [updatedComentario, comentarioID], (err, result) => {
        if (err) {
            console.error('Error al actualizar comentario o reseña de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Comentario o reseña de producto no encontrada' });
            } else {
                res.status(200).json({ message: 'Comentario o reseña de producto actualizada exitosamente' });
            }
        }
    });
};

// Elimina un comentario o reseña de producto existente
export const deleteComentarioResenaProducto = (req: Request, res: Response) => {
    const comentarioID = req.params.id;
    const query = 'DELETE FROM ComentariosResenasProductos WHERE IDComentario = ?';

    connection.query(query, comentarioID, (err, result) => {
        if (err) {
            console.error('Error al eliminar comentario o reseña de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Comentario o reseña de producto no encontrada' });
            } else {
                res.status(200).json({ message: 'Comentario o reseña de producto eliminada exitosamente' });
            }
        }
    });
};
