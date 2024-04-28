import express from 'express';
import { createProductosCloudD, createProductos, getProductoById, updateProducto, deleteProducto,getProductosByUsuarioInventario, getAllProducto } from '../controllers/ProductoController';

const router = express.Router();


router.get('/products', getAllProducto);
router.post('/productsFromFlowerShop',getProductosByUsuarioInventario );
// router.post('/products', createProducto);
router.post('/products', createProductos);
router.get('/products/:id', getProductoById);
router.put('/products/:id', updateProducto);
router.delete('/products/:id', deleteProducto);

router.post('/createProductos', createProductosCloudD);


export default router;
