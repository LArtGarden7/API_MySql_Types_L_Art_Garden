// routes/UserRoutes.ts
import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserByEmailAndPassword, getUserImage, updateUser } from '../controllers/UserController';

const router = express.Router();

router.get('/userImage/:filename', getUserImage);
router.get('/users', getAllUsers);
router.get('/user', getUserByEmailAndPassword);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
