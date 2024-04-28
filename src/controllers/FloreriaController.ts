import { authenticateToken, authorizeRole } from '../middleware/AutenticacionDeTokens';
import jwt from 'jsonwebtoken';
import { RequestHandler,Request, Response, NextFunction, response } from 'express';
import { connection } from '../config/dbconfig';
import { Floreria } from '../models/Floreria';
import multer from 'multer';
import cloudinaryUpload from '../config/cloudinaryConfig'; // Importa la configuración de multer para Cloudinary

// export const uploadImage: RequestHandler = (req: Request, res: Response, next) => {
//     cloudinaryUpload.single('Foto')(req, res, (err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error al subir la imagen', error: err });
//         }
//         next();
//     });
// };
export const getFloreriaImage: RequestHandler = (req, res) => {
    const filename = req.params.filename;
    // Use an environment variable for the Cloudinary image directory
    const folder = process.env.CLOUDINARY_FOLDER || 'Imagenes';
    const imageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${folder}/${filename}.png`;
    console.log('Image URL:', imageUrl);
    // Redirect the client to the image URL
    res.redirect(imageUrl);
};

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
//--------------------------------------------------------------------------------------------------------------
// export const getFloreriaByUserId: RequestHandler = (req: Request, res: Response) => {
//     const { IDUsuario } = req.body;
//     const query = 'SELECT * FROM Florerias WHERE IDUsuario = ?';
//     connection.query(query, [IDUsuario], (err, results) => {
//         if (err) {
//             res.status(500).json({ message: 'Error interno del servidor', error: err });
//         } else {
//             if (results.length > 0) {
//                 res.status(200).json({ floreria: results[0] });
//             } else {
//                 res.status(404).json({ message: 'No se encontró la florería para este usuario', error: 'No se encontró la florería' });
//             }
//         }
//     });
// };
export const getFloreriaByUserId: RequestHandler = (req: Request, res: Response) => {
    const { IDUsuario } = req.body;
    const query = 'SELECT * FROM Florerias WHERE IDUsuario = ?';
    connection.query(query, [IDUsuario], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error interno del servidor', error: err });
        } else {
            if (results.length > 0) {
                res.status(200).json({ floreria: results[0] });
            } else {
                res.status(404).json({ message: 'No se encontró la florería para este usuario', error: 'No se encontró la florería' });
            }
        }
    });
};
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// export const createFloreria = [upload.single('Foto'), (req: Request, res: Response) => {
//     console.log('req.body:', req.body); // Imprime el cuerpo de la solicitud
//     console.log('req.file:', req.file); // Imprime el archivo de la solicitud

//     const floreria = req.body;
//     if (!req.file || !req.file.path) {
//         floreria.Foto = null;
//     } else {
//         floreria.Foto = req.file.path;
//     }

//     const query = 'CALL InsertarFloreria(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

//     connection.query(
//     query,
//     [
//         floreria.IDUsuario,
//         floreria.NombreFloreria,
//         floreria.Descripcion,
//         floreria.Direccion,
//         floreria.Telefono,
//         floreria.CorreoElectronico,
//         floreria.RedesSociales,
//         floreria.Foto,
//         floreria.HoraApertura,
//         floreria.HoraCierre,
//         floreria.Longitud,
//         floreria.Latitud,
//         floreria.EstadoFloreria
//     ],
//     (err, result) => {
//         if (err) {
//         console.error('Error al crear florería:', err);
//         res.status(500).json({ message: 'Error interno del servidor' });
//         } else {
//         res.status(201).json({message: "Floreria creada con exito"});
//         }
//     }
//     );
// }];
export const createFloreria: RequestHandler[] = [
    cloudinaryUpload.single('Foto'), // Middleware para manejar la subida de archivos
    (req: Request, res: Response) => {
        console.log('req.body:', req.body); // Imprime el cuerpo de la solicitud
        console.log('req.file:', req.file); // Imprime el archivo de la solicitud

        const floreria = req.body;
        if (!req.file || !req.file.path) {
            floreria.Foto = null;
        } else {
            floreria.Foto = req.file.path; // Obtiene el URL de la imagen subida a Cloudinary
        }

        const query = 'CALL InsertarFloreria(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

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
                floreria.Foto,
                floreria.HoraApertura,
                floreria.HoraCierre,
                floreria.Longitud,
                floreria.Latitud,
                floreria.EstadoFloreria
            ],
            (err, result) => {
                if (err) {
                    console.error('Error al crear florería:', err);
                    res.status(500).json({ message: 'Error interno del servidor' });
                } else {
                    res.status(201).json({message: "Floreria creada con exito"});
                }
            }
        );
    }
];
//--------------------------------------------------------------------------------------------------------------


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
