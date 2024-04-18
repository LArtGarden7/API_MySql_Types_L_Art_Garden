import multer from 'multer';

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer({ storage: storage });

export const getUserByEmailAndPassword: RequestHandler = async (req: Request, res: Response) => {
    const { CorreoElectronico, Contrasenia } = req.body;
    console.log("Correo",CorreoElectronico, "contraseña: ", Contrasenia);
    const query = 'SELECT * FROM Usuarios WHERE CorreoElectronico = ?';
    connection.query(query, [CorreoElectronico], async (err, results) => {
        if (err) {
            console.error('Error al obtener usuario por correo:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            if (results.length > 0) {
                const match = await bcrypt.compare(Contrasenia, results[0].Contrasenia);
                if (match) {
                    const token = jwt.sign({ id: results[0].ID, role: results[0].TipoUsuarioID }, process.env.ACCESS_TOKEN_SECRET as string);
                    delete results[0].Contrasenia;
                    let imageUrl;
                    if (results[0].Foto) {
                        imageUrl = `http://localhost:3000/api/users/image/${path.basename(results[0].Foto)}`;
                    } else {
                        imageUrl = null; // o puedes poner una URL de imagen predeterminada
                    }
                    res.status(200).json({ user: { ...results[0], Foto: imageUrl }, token });
                } else {
                    res.status(401).json({ message: 'Credenciales incorrectas' });
                }
            } else {
                res.status(404).json({ message: 'Credenciales incorrectas' });
            }
        }
    });
};

export const getUserImage: RequestHandler = (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.resolve(process.env.IMAGE_DIR || 'uploads', filename);
    res.sendFile(imagePath);
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

export const createUser = [upload.single('Foto'), async (req: Request, res: Response) => {
    const user: User = req.body;

    console.log('User:', user); // Imprime el objeto user

    // Hashear la Contrasenia
    const saltRounds = 10;
    console.log('not Hashed Contrasenia:', user.Contrasenia); // Imprime la Contrasenia hasheada
    user.Contrasenia = await bcrypt.hash(user.Contrasenia, saltRounds);

    console.log('Hashed Contrasenia:', user.Contrasenia); // Imprime la Contrasenia hasheada

    // Guardar la ruta de la imagen en el usuario
    if (req.file) {
        user.Foto = req.file.path;
    }

    const query = 'INSERT INTO Usuarios SET ?';

    connection.query(query, user, (err, result) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        } else {
            // Obtener el rol del usuario de la tabla de roles
            const roleQuery = 'SELECT Tipo FROM TipoUsuario WHERE ID = ?';
            connection.query(roleQuery, user.TipoUsuarioID, (err, roleResult) => {
                if (err) {
                    console.error('Error al obtener el rol del usuario:', err);
                    res.status(500).json({ message: 'Error interno del servidor' });
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
