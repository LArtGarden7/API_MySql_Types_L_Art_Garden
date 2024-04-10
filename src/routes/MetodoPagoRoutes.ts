import express from 'express';
import { createMetodoPago, getMetodoPagoById, updateMetodoPago, deleteMetodoPago } from '../controllers/MetodoPagoController';

const router = express.Router();

// Rutas CRUD para Métodos de Pago
router.post('/metodos-pago', createMetodoPago);
router.get('/metodos-pago/:id', getMetodoPagoById);
router.put('/metodos-pago/:id', updateMetodoPago);
router.delete('/metodos-pago/:id', deleteMetodoPago);

export default router;
