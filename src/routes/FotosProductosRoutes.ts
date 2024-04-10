import express from 'express';
import { createFotoProducto, getFotoProductoById, deleteFotoProducto } from '../controllers/FotosProductosController';

const router = express.Router();

router.post('/fotos-productos', createFotoProducto);
router.get('/fotos-productos/:id', getFotoProductoById);
router.delete('/fotos-productos/:id', deleteFotoProducto);

export default router;
