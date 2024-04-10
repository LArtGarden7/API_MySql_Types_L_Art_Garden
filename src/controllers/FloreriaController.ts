import { Request, Response } from 'express';
import { connection } from '../config/dbconfig';
import { Floreria } from '../models/Floreria';


export const getAllFlowers = ((req: Request, res:Response)=>{
    const query = 'SELECT * FROM Florerias';

    connection.query(query, (err, results)=>{
        if (err) {
            console.error('Error al obtener florerias:', err);
            res.status(500).json({message: 'Error interno del servidor'});
        }
        else{
            res.status(200).json(results);
        }
    });
});

export const createFloreria = (req: Request, res: Response) => {
    const floreria = req.body;

    const query = 'CALL InsertarFloreria(?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(
        query,
        [
            floreria.IDUsuario,
            floreria.NombreFloreria,
            floreria.Descripcion,
            floreria.Direccion,
            floreria.Telefono,
            floreria.CorreoElectronico,
            floreria.RedesSociales,
            floreria.Foto
        ],
        (err, result) => {
            if (err) {
                console.error('Error al crear florería:', err);
                res.status(500).json({ message: 'Error interno del servidor' });
            } else {
                res.status(201).json({message: "Floreria creada con exito"}); // Envía una respuesta de estado 201 (Created) sin contenido adicional
            }
        }
    );
};



export const getFloreriaById = (req: Request, res: Response) => {
    const floreriaID = req.params.id;
    const query = 'SELECT * FROM Florerias WHERE ID = ?';

    connection.query(query, floreriaID, (err, result) => {
        if (err) {
            console.error('Error al obtener florería:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Florería no encontrada' });
            } else {
                res.status(200).json(result[0]);
            }
        }
    });
};

export const updateFloreria = (req: Request, res: Response) => {
    const floreriaID = req.params.id;
    const updatedFloreria: Floreria = req.body;
    const query = 'UPDATE Florerias SET ? WHERE ID = ?';

    connection.query(query, [updatedFloreria, floreriaID], (err, result) => {
        if (err) {
            console.error('Error al actualizar florería:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Florería no encontrada' });
            } else {
                res.status(200).json({ message: 'Florería actualizada exitosamente' });
            }
        }
    });
};

export const deleteFloreria = (req: Request, res: Response) => {
    const floreriaID = req.params.id;
    const query = 'DELETE FROM Florerias WHERE ID = ?';

    connection.query(query, floreriaID, (err, result) => {
        if (err) {
            console.error('Error al eliminar florería:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Florería no encontrada' });
            } else {
                res.status(200).json({ message: 'Florería eliminada exitosamente' });
            }
        }
    });
};
