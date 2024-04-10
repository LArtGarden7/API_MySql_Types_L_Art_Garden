import express from 'express';
import { createPago, getPagoById, updatePago, deletePago } from '../controllers/PagoController';

const router = express.Router();

// Rutas CRUD para Pagos
router.post('/pagos', createPago);
router.get('/pagos/:id', getPagoById);
router.put('/pagos/:id', updatePago);
router.delete('/pagos/:id', deletePago);

export default router;
