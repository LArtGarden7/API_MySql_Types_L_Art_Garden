import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { CategoriaProducto } from '../models/CategoriaProducto';

// Función para crear una nueva categoría de producto
export const createCategoriaProducto = (req: Request, res: Response) => {
    const categoriaProducto: CategoriaProducto = req.body;
    const query = 'INSERT INTO CategoriasProductos SET ?';

    connection.query(query, categoriaProducto, (err, result) => {
        if (err) {
            console.error('Error al crear categoría de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Categoría de producto creada exitosamente', categoriaID: result.insertId });
        }
    });
};

// Función para obtener una categoría de producto por su ID
export const getCategoriaProductoById = (req: Request, res: Response) => {
    const categoriaID = req.params.id;
    const query = 'SELECT * FROM CategoriasProductos WHERE ID = ?';

    connection.query(query, categoriaID, (err, result) => {
        if (err) {
            console.error('Error al obtener categoría de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Categoría de producto no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Función para actualizar una categoría de producto
export const updateCategoriaProducto = (req: Request, res: Response) => {
    const categoriaID = req.params.id;
    const updatedCategoriaProducto: CategoriaProducto = req.body;
    const query = 'UPDATE CategoriasProductos SET ? WHERE ID = ?';

    connection.query(query, [updatedCategoriaProducto, categoriaID], (err, result) => {
        if (err) {
            console.error('Error al actualizar categoría de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Categoría de producto no encontrada' });
            } else {
                res.status(200).json({ message: 'Categoría de producto actualizada exitosamente' });
            }
        }
    });
};

// Función para eliminar una categoría de producto
export const deleteCategoriaProducto = (req: Request, res: Response) => {
    const categoriaID = req.params.id;
    const query = 'DELETE FROM CategoriasProductos WHERE ID = ?';

    connection.query(query, categoriaID, (err, result) => {
        if (err) {
            console.error('Error al eliminar categoría de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Categoría de producto no encontrada' });
            } else {
                res.status(200).json({ message: 'Categoría de producto eliminada exitosamente' });
            }
        }
    });
};
