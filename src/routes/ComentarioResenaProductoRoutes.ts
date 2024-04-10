import express from 'express';
import { createComentarioResenaProducto, getComentarioResenaProductoById, updateComentarioResenaProducto, deleteComentarioResenaProducto } from '../controllers/ComentarioResenaProductoController';

const router = express.Router();

// Rutas CRUD para Comentarios o Reseñas de Productos
router.post('/comentarios-resenas-productos', createComentarioResenaProducto);
router.get('/comentarios-resenas-productos/:id', getComentarioResenaProductoById);
router.put('/comentarios-resenas-productos/:id', updateComentarioResenaProducto);
router.delete('/comentarios-resenas-productos/:id', deleteComentarioResenaProducto);

export default router;
