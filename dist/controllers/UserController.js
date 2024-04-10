"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.createUser = exports.getAllUsers = void 0;
const dbconfig_1 = require("../config/dbconfig");
const getAllUsers = (req, res) => {
    const query = 'SELECT * FROM Usuarios';
    dbconfig_1.connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(200).json(results);
        }
    });
};
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => {
    const user = req.body;
    const query = 'INSERT INTO Usuarios SET ?';
    dbconfig_1.connection.query(query, user, (err, result) => {
        if (err) {
            console.error('Error al crear usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Usuario creado exitosamente', userID: result.insertId });
        }
    });
};
exports.createUser = createUser;
const getUserById = (req, res) => {
    const userID = req.params.id;
    const query = 'SELECT * FROM Usuarios WHERE ID = ?';
    dbconfig_1.connection.query(query, userID, (err, result) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getUserById = getUserById;
const updateUser = (req, res) => {
    const userID = req.params.id;
    const updatedUser = req.body;
    const query = 'UPDATE Usuarios SET ? WHERE ID = ?';
    dbconfig_1.connection.query(query, [updatedUser, userID], (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        }
    });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const userID = req.params.id;
    const query = 'DELETE FROM Usuarios WHERE ID = ?';
    dbconfig_1.connection.query(query, userID, (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        }
    });
};
exports.deleteUser = deleteUser;
