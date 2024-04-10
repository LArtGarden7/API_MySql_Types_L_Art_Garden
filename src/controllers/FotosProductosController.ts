import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { FotoProducto } from '../models/FotosProductos';

// Función para crear una nueva foto de producto
export const createFotoProducto = (req: Request, res: Response) => {
    const fotoProducto: FotoProducto = req.body;
    const query = 'INSERT INTO FotosProductos SET ?';

    connection.query(query, fotoProducto, (err, result) => {
        if (err) {
            console.error('Error al crear foto de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Foto de producto creada exitosamente', fotoID: result.insertId });
        }
    });
};

// Función para obtener una foto de producto por su ID
export const getFotoProductoById = (req: Request, res: Response) => {
    const fotoID = req.params.id;
    const query = 'SELECT * FROM FotosProductos WHERE IDFoto = ?';

    connection.query(query, fotoID, (err, result) => {
        if (err) {
            console.error('Error al obtener foto de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Foto de producto no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Función para eliminar una foto de producto
export const deleteFotoProducto = (req: Request, res: Response) => {
    const fotoID = req.params.id;
    const query = 'DELETE FROM FotosProductos WHERE IDFoto = ?';

    connection.query(query, fotoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar foto de producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Foto de producto no encontrada' });
            } else {
                res.status(200).json({ message: 'Foto de producto eliminada exitosamente' });
            }
        }
    });
};
