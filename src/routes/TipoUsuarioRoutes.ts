// routes/TipoUsuarioRoutes.ts
import express from 'express';
import { createTipoUsuario, getTipoUsuarioById, updateTipoUsuario, deleteTipoUsuario } from '../controllers/TipoUsuarioController';

const router = express.Router();

router.post('/tipoUsuario', createTipoUsuario);
router.get('/tipoUsuario/:id', getTipoUsuarioById);
router.put('/tipoUsuario/:id', updateTipoUsuario);
router.delete('/tipoUsuario/:id', deleteTipoUsuario);

export default router;
