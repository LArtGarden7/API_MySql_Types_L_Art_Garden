import multer from 'multer';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { authenticateToken, authorizeRole } from '../middleware/AutenticacionDeTokens';
import jwt from 'jsonwebtoken';
import { RequestHandler,Request, Response, NextFunction, response } from 'express';
import { connection } from '../config/dbconfig';
import { User } from '../models/User';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

//----------------------------------------------------------------------------------------------------------------------------

// Check if uploads directory exists, if not, create it
const uploadsDir = path.resolve(__dirname, process.env.UPLOADS_DIR || 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});
const upload = multer({ storage: storage });

export const getUserByEmailAndPassword: RequestHandler = async (req: Request, res: Response) => {
    const { CorreoElectronico, Contrasenia } = req.body;
    const query = 'SELECT * FROM Usuarios WHERE CorreoElectronico = ?';
    connection.query(query, [CorreoElectronico], async (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error interno del servidor', error: err });
        } else {
            if (results.length > 0) {
                const match = await bcrypt.compare(Contrasenia, results[0].Contrasenia);
                if (match) {
                    const token = jwt.sign({ id: results[0].ID, role: results[0].TipoUsuarioID }, process.env.ACCESS_TOKEN_SECRET as string);
                    delete results[0].Contrasenia;
                    let imageName;
                    if (results[0].Foto) {
                        imageName = path.basename(results[0].Foto);
                    } else {
                        imageName = null; // or you can put a default image name
                    }
                    res.status(200).json({ user: { ...results[0], Foto: imageName }, token });
                } else {
                    res.status(401).json({ message: 'Credenciales incorrectas', error: 'La contraseña no coincide' });
                }
            } else {
                res.status(404).json({ message: 'Credenciales incorrectas', error: 'No se encontró el usuario' });
            }
        }
    });
};
export const getUserImage: RequestHandler = (req, res) => {
    const filename = req.params.filename;
    // Use an environment variable for the image directory
    const imagePath = path.join(__dirname, process.env.IMAGE_DIR || 'uploads', filename);
    console.log('Image path:', imagePath);
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({ message: 'File not found', error: `No se encontró el archivo ${filename}` });
    }
};
//---------------------------------------------------------------------------------------------------------------------
export const getAllUsers = (req: Request, res: Response) => {
    const query = 'SELECT * FROM Usuarios';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(200).json(results);
        }
    });
};

export const    createUser = [upload.single('Foto'), async (req: Request, res: Response) => {
    const user: User = req.body;

    console.log('User:', user); // Imprime el objeto user

    // Hashear la Contrasenia
    const saltRounds = 10;
    console.log('not Hashed Contrasenia:', user.Contrasenia); // Imprime la Contrasenia hasheada
    user.Contrasenia = await bcrypt.hash(user.Contrasenia, saltRounds);

    console.log('Hashed Contrasenia:', user.Contrasenia); // Imprime la Contrasenia hasheada

    // Guardar la ruta de la imagen en el usuario
    if (req.file) {
        console.log('File:', req.file); // Imprime el objeto file
        user.Foto = req.file.filename;
        console.log('Image filename:', user.Foto); // Imprime el nombre del archivo
    } else {
        console.log('No file provided'); // Imprime un mensaje si no se proporcionó un archivo
    }

    const query = 'INSERT INTO Usuarios SET ?';

    connection.query(query, user, (err, result) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor', error: err });
        } else {
            // Obtener el rol del usuario de la tabla de roles
            const roleQuery = 'SELECT Tipo FROM TipoUsuario WHERE ID = ?';
            connection.query(roleQuery, user.TipoUsuarioID, (err, roleResult) => {
                if (err) {
                    console.error('Error al obtener el rol del usuario:', err);
                    res.status(500).json({ message: 'Error interno del servidor', error: err });
                } else {
                    // Generar un token para el nuevo usuario
                    const token = jwt.sign({ id: result.insertId, role: roleResult[0].Tipo }, process.env.ACCESS_TOKEN_SECRET as string);

                    console.log('Token:', token); // Imprime el token

                    // Enviar el token al cliente
                    res.status(201).json({ message: 'Usuario creado exitosamente', userID: result.insertId, token });
                }
            });
        }
    });
}];
export const updateUser = (req: Request, res: Response) => {
    const userID = req.params.id;
    const updatedUser: User = req.body;
    const query = 'UPDATE Usuarios SET ? WHERE ID = ?';

    connection.query(query, [updatedUser, userID], (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        }
    });
};

export const deleteUser = (req: Request, res: Response) => {
    const userID = req.params.id;
    const query = 'DELETE FROM Usuarios WHERE ID = ?';

    connection.query(query, userID, (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        }
    });
};

export const updateUserAddresses = (req: Request, res: Response) => {
    
    const { ID,Direccion1, Direccion2, Direccion3 } = req.body;
    const query = 'UPDATE Usuarios SET Direccion1 = ?, Direccion2 = ?, Direccion3 = ? WHERE ID = ?';

    connection.query(query, [Direccion1, Direccion2, Direccion3, ID], (err, result) => {
        if (err) {
            console.error('Error al actualizar las direcciones del usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            res.status(200).json({ message: 'Direcciones del usuario actualizadas exitosamente' });
        }
    });
};
