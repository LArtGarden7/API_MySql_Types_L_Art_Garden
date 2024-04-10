import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Producto } from '../models/Producto';

// Función para crear un nuevo producto

export const getAllProducto = (req: Request, res:Response)=>
{
    const query = 'SELECT * FROM Productos';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });
}

export const createProducto = (req: Request, res: Response) => {
    const producto: Producto = req.body;
    const query = 'INSERT INTO Productos SET ?';

    connection.query(query, producto, (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Producto creado exitosamente', productoID: result.insertId });
        }
    });
};

// Función para obtener un producto por su ID
export const getProductoById = (req: Request, res: Response) => {
    const productoID = req.params.id;
    const query = 'SELECT * FROM Productos WHERE IDProducto = ?';

    connection.query(query, productoID, (err, result) => {
        if (err) {
            console.error('Error al obtener producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

// Función para actualizar un producto
export const updateProducto = (req: Request, res: Response) => {
    const productoID = req.params.id;
    const updatedProducto: Producto = req.body;
    const query = 'UPDATE Producto SET ? WHERE IDProducto = ?';

    connection.query(query, [updatedProducto, productoID], (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            } else {
                res.status(200).json({ message: 'Producto actualizado exitosamente' });
            }
        }
    });
};

// Función para eliminar un producto
export const deleteProducto = (req: Request, res: Response) => {
    const productoID = req.params.id;
    const query = 'DELETE FROM Producto WHERE IDProducto = ?';

    connection.query(query, productoID, (err, result) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            } else {
                res.status(200).json({ message: 'Producto eliminado exitosamente' });
            }
        }
    });
};
