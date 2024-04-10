import express from 'express';
import { createDireccionEnvio, getDireccionEnvioById, updateDireccionEnvio, deleteDireccionEnvio } from '../controllers/DireccionesEnvioController';

const router = express.Router();

// Rutas CRUD para Direcciones de Envío
router.post('/direcciones-envio', createDireccionEnvio);
router.get('/direcciones-envio/:id', getDireccionEnvioById);
router.put('/direcciones-envio/:id', updateDireccionEnvio);
router.delete('/direcciones-envio/:id', deleteDireccionEnvio);

export default router;
