import express from 'express';
import { createInventario, getInventarioById, updateInventario, deleteInventario } from '../controllers/InventarioController';

const router = express.Router();

router.post('/inventario', createInventario);
router.get('/inventario/:id', getInventarioById);
router.put('/inventario/:id', updateInventario);
router.delete('/inventario/:id', deleteInventario);

export default router;
