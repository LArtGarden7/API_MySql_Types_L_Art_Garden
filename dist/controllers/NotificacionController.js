"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotificacion = exports.updateNotificacion = exports.getNotificacionById = exports.createNotificacion = void 0;
const dbconfig_1 = require("../config/dbconfig");
// Crea una nueva notificación
const createNotificacion = (req, res) => {
    const notificacion = req.body;
    const query = 'INSERT INTO Notificaciones SET ?';
    dbconfig_1.connection.query(query, notificacion, (err, result) => {
        if (err) {
            console.error('Error al crear notificación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            res.status(201).json({ message: 'Notificación creada exitosamente', notificacionID: result.insertId });
        }
    });
};
exports.createNotificacion = createNotificacion;
// Obtiene una notificación por su ID
const getNotificacionById = (req, res) => {
    const notificacionID = req.params.id;
    const query = 'SELECT * FROM Notificaciones WHERE IDNotificacion = ?';
    dbconfig_1.connection.query(query, notificacionID, (err, result) => {
        if (err) {
            console.error('Error al obtener notificación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.length === 0) {
                res.status(404).json({ message: 'Notificación no encontrada' });
            }
            else {
                res.status(200).json(result[0]);
            }
        }
    });
};
exports.getNotificacionById = getNotificacionById;
// Actualiza una notificación existente
const updateNotificacion = (req, res) => {
    const notificacionID = req.params.id;
    const updatedNotificacion = req.body;
    const query = 'UPDATE Notificaciones SET ? WHERE IDNotificacion = ?';
    dbconfig_1.connection.query(query, [updatedNotificacion, notificacionID], (err, result) => {
        if (err) {
            console.error('Error al actualizar notificación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Notificación no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Notificación actualizada exitosamente' });
            }
        }
    });
};
exports.updateNotificacion = updateNotificacion;
// Elimina una notificación existente
const deleteNotificacion = (req, res) => {
    const notificacionID = req.params.id;
    const query = 'DELETE FROM Notificaciones WHERE IDNotificacion = ?';
    dbconfig_1.connection.query(query, notificacionID, (err, result) => {
        if (err) {
            console.error('Error al eliminar notificación:', err);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
        else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Notificación no encontrada' });
            }
            else {
                res.status(200).json({ message: 'Notificación eliminada exitosamente' });
            }
        }
    });
};
exports.deleteNotificacion = deleteNotificacion;
