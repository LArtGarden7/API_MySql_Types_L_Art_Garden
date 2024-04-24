import express from 'express';
import { getFloreriaByUserId, createFloreria, getFloreriaById, updateFloreria, deleteFloreria, getAllFlowers } from '../controllers/FloreriaController';

const router = express.Router();

router.get('/flowerShops', getAllFlowers);
router.post('/flowerShops', createFloreria);
router.get('/flowerShops/:id', getFloreriaById);
router.put('/flowerShops/:id', updateFloreria);
router.delete('/flowerShops/:id', deleteFloreria);
router.post('/flowerShopsByUserId', getFloreriaByUserId);

export default router;
