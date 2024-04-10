// controllers/TipoUsuarioController.ts
import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { TipoUsuario } from '../models/TipoUsuario';

export const createTipoUsuario = (req: Request, res: Response) => {
    const tipoUsuario: TipoUsuario = req.body;
    const query = 'INSERT INTO TipoUsuario SET ?';

    connection.query(query, tipoUsuario, (err, result) => {
        if (err) {
            console.error('Error al crear tipo de usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(201).json({ message: 'Tipo de usuario creado exitosamente', tipoUsuarioID: result.insertId });
        }
    });
};

export const getTipoUsuarioById = (req: Request, res: Response) => {
    const tipoUsuarioID = req.params.id;
    const query = 'SELECT * FROM TipoUsuario WHERE ID = ?';

    connection.query(query, tipoUsuarioID, (err, result) => {
        if (err) {
            console.error('Error al obtener tipo de usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Tipo de usuario no encontrado' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

export const updateTipoUsuario = (req: Request, res: Response) => {
    const tipoUsuarioID = req.params.id;
    const updatedTipoUsuario: TipoUsuario = req.body;
    const query = 'UPDATE TipoUsuario SET ? WHERE ID = ?';

    connection.query(query, [updatedTipoUsuario, tipoUsuarioID], (err) => {
        if (err) {
            console.error('Error al actualizar tipo de usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Tipo de usuario actualizado exitosamente' });
        }
    });
};

export const deleteTipoUsuario = (req: Request, res: Response) => {
    const tipoUsuarioID = req.params.id;
    const query = 'DELETE FROM TipoUsuario WHERE ID = ?';

    connection.query(query, tipoUsuarioID, (err) => {
        if (err) {
            console.error('Error al eliminar tipo de usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Tipo de usuario eliminado exitosamente' });
        }
    });
};
