"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTipoUsuario = exports.updateTipoUsuario = exports.getTipoUsuarioById = exports.createTipoUsuario = void 0;
const dbconfig_1 = require("../config/dbconfig");
const createTipoUsuario = (req, res) => {
    const tipoUsuario = req.body;
    const query = 'INSERT INTO TipoUsuario SET ?';
    dbconfig_1.connection.query(query, tipoUsuario, (err, result) => {
        if (err) {
            console.error('Error al crear tipo de usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Tipo de usuario creado exitosamente', tipoUsuarioID: result.insertId });
        }
    });
};
exports.createTipoUsuario = createTipoUsuario;
const getTipoUsuarioById = (req, res) => {
    const tipoUsuarioID = req.params.id;
    const query = 'SELECT * FROM TipoUsuario WHERE ID = ?';
    dbconfig_1.connection.query(query, tipoUsuarioID, (err, result) => {
        if (err) {
            console.error('Error al obtener tipo de usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Tipo de usuario no encontrado' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getTipoUsuarioById = getTipoUsuarioById;
const updateTipoUsuario = (req, res) => {
    const tipoUsuarioID = req.params.id;
    const updatedTipoUsuario = req.body;
    const query = 'UPDATE TipoUsuario SET ? WHERE ID = ?';
    dbconfig_1.connection.query(query, [updatedTipoUsuario, tipoUsuarioID], (err) => {
        if (err) {
            console.error('Error al actualizar tipo de usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(200).json({ message: 'Tipo de usuario actualizado exitosamente' });
        }
    });
};
exports.updateTipoUsuario = updateTipoUsuario;
const deleteTipoUsuario = (req, res) => {
    const tipoUsuarioID = req.params.id;
    const query = 'DELETE FROM TipoUsuario WHERE ID = ?';
    dbconfig_1.connection.query(query, tipoUsuarioID, (err) => {
        if (err) {
            console.error('Error al eliminar tipo de usuario:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(200).json({ message: 'Tipo de usuario eliminado exitosamente' });
        }
    });
};
exports.deleteTipoUsuario = deleteTipoUsuario;
