import { Router } from 'express';
import { createTarjetaCredito, getTarjetaCreditoById, updateTarjetaCredito, deleteTarjetaCredito, getAllTarjetasCredito } from '../controllers/TarjetaCreditoController';

const router = Router();

// Rutas para TarjetaCredito
router.post('/tarjetasCredito', createTarjetaCredito);
router.get('/tarjetasCredito/:id', getTarjetaCreditoById);
router.put('/tarjetasCredito/:id', updateTarjetaCredito);
router.delete('/tarjetasCredito/:id', deleteTarjetaCredito);
router.get('/tarjetasCredito', getAllTarjetasCredito);

export default router;