// routes/UserRoutes.ts
import express from 'express';
import { createUserCloudD, getUserById,updateUserAddresses, deleteUser, getAllUsers, getUserByEmailAndPassword, getUserImage, updateUser } from '../controllers/UserController';

const router = express.Router();

router.get('/userImage/:filename', getUserImage);
router.get('/users', getAllUsers);
router.post('/userById', getUserById);
router.post('/UpdateAdress', updateUserAddresses);
router.post('/user', getUserByEmailAndPassword);
// router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/createAccount', createUserCloudD);


export default router;
