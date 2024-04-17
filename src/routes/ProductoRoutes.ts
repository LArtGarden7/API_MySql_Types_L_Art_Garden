import express from 'express';
import { createProductos, getProductoById, updateProducto, deleteProducto, getAllProducto } from '../controllers/ProductoController';

const router = express.Router();


router.get('/products', getAllProducto);
// router.post('/products', createProducto);
router.post('/products', createProductos);
router.get('/products/:id', getProductoById);
router.put('/products/:id', updateProducto);
router.delete('/products/:id', deleteProducto);

export default router;
