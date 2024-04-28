import { Router } from 'express';
import { getTarjetaCreditoByData, createTarjetaCredito, getTarjetaCreditoById, updateTarjetaCredito, deleteTarjetaCredito, getAllTarjetasCredito } from '../controllers/TarjetaCreditoController';

const router = Router();

// Rutas para TarjetaCredito
router.post('/tarjetasCredito', createTarjetaCredito);
router.post('/tarjetasCredito/:id', getTarjetaCreditoById);
router.put('/tarjetasCredito/:id', updateTarjetaCredito);
router.delete('/tarjetasCredito/:id', deleteTarjetaCredito);
router.get('/tarjetasCredito', getAllTarjetasCredito);
router.post('/tarjetasCredito', getTarjetaCreditoByData);

export default router;