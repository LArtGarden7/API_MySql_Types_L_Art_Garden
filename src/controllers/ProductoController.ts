import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Producto } from '../models/Producto';
import multer from 'multer';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { RequestHandler, NextFunction, response } from 'express';
import path from 'path';
import { ParsedQs } from 'qs';
import uploadConfig from '../config/cloudinaryConfig';


// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});
const upload = multer({ storage: storage });

export const createProductos = [upload.fields([{ name: 'Imagen1', maxCount: 1 }, { name: 'Imagen2', maxCount: 1 }, { name: 'Imagen3', maxCount: 1 }, { name: 'Imagen4', maxCount: 1 }, { name: 'Imagen5', maxCount: 1 }]), (req: Request, res: Response) => {
    const producto: Producto = req.body;

    // Guardar las rutas de las imágenes en el producto
    if (req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        if (files.Imagen1) producto.Imagen1 = files.Imagen1[0].path;
        if (files.Imagen2) producto.Imagen2 = files.Imagen2[0].path;
        if (files.Imagen3) producto.Imagen3 = files.Imagen3[0].path;
        if (files.Imagen4) producto.Imagen4 = files.Imagen4[0].path;
        if (files.Imagen5) producto.Imagen5 = files.Imagen5[0].path;
    }

    const query = 'INSERT INTO Productos SET ?';

    connection.query(query, producto, (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Producto creado exitosamente', productID: result.insertId });
        }
    });
}];

export const createProductosCloudD = [uploadConfig.fields([{ name: 'Imagen1', maxCount: 1 }, { name: 'Imagen2', maxCount: 1 }, { name: 'Imagen3', maxCount: 1 }, { name: 'Imagen4', maxCount: 1 }, { name: 'Imagen5', maxCount: 1 }]), (req: Request, res: Response) => {
    const producto: Producto = req.body;

    // Guardar los URLs de las imágenes en el producto
    if (req.files) {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        if (files.Imagen1) producto.Imagen1 = files.Imagen1[0].path;
        if (files.Imagen2) producto.Imagen2 = files.Imagen2[0].path;
        if (files.Imagen3) producto.Imagen3 = files.Imagen3[0].path;
        if (files.Imagen4) producto.Imagen4 = files.Imagen4[0].path;
        if (files.Imagen5) producto.Imagen5 = files.Imagen5[0].path;
    }

    const query = 'INSERT INTO Productos SET ?';

    connection.query(query, producto, (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Producto creado exitosamente', productoID: result.insertId });
        }
    });
}];

export const getAllProducto = (req: Request, res:Response) => {
    const query = `
        SELECT Productos.*, Florerias.NombreFloreria, CategoriasProductos.NombreCategoria
        FROM Productos 
        INNER JOIN Inventario ON Productos.IDInventario = Inventario.IDInventario
        INNER JOIN Florerias ON Inventario.IDFloreria = Florerias.ID
        INNER JOIN CategoriasProductos ON Productos.IDCategoria = CategoriasProductos.ID
    `;

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
export const getProductosByUsuarioInventario = (req: Request, res: Response) => {
    const { usuarioID, inventarioID } = req.body;
 
    const query = `
    SELECT Productos.*, Florerias.NombreFloreria, CategoriasProductos.NombreCategoria
    FROM Productos 
    INNER JOIN Inventario ON Productos.IDInventario = Inventario.IDInventario
    INNER JOIN Florerias ON Inventario.IDFloreria = Florerias.ID
    INNER JOIN CategoriasProductos ON Productos.IDCategoria = CategoriasProductos.ID
    WHERE Florerias.IDUsuario = ? AND Inventario.IDInventario = ?
    `;

    connection.query(query, [usuarioID, inventarioID], (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Productos no encontrados' });
            } else {
                res.status(200).json(results);
            }
        }
    });
};

// export const createProducto = (req: Request, res: Response) => {
//     const producto: Producto = req.body;
//     const query = 'INSERT INTO Productos SET ?';

//     connection.query(query, producto, (err, result) => {
//         if (err) {
//             console.error('Error al crear producto:', err);
//             res.status(500).json({ message: 'Error interno del servidor' });
//         } else {
//             res.status(201).json({ message: 'Producto creado exitosamente', productoID: result.insertId });
//         }
//     });
// };

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



