import express from 'express';
import { createCategoriaProducto, getCategoriaProductoById, updateCategoriaProducto, deleteCategoriaProducto } from '../controllers/CategoriaProductoController';

const router = express.Router();

router.post('/categoria-producto', createCategoriaProducto);
router.get('/categoria-producto/:id', getCategoriaProductoById);
router.put('/categoria-producto/:id', updateCategoriaProducto);
router.delete('/categoria-producto/:id', deleteCategoriaProducto);

export default router;
