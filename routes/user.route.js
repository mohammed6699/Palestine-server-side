import express from "express";
import verifyToken from '../middleware/verifyToken.js';
import allowedto from '../middleware/allowedto.js';
import userRole from '../configs/user.role.js';
import { upload } from './../configs/multer.js';
import { deleteUser, getAllUsers, getUserById, loginUser, registerNewUser, updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.post('/register', upload.single("media"),registerNewUser);
userRouter.post('/login', loginUser);
userRouter.get('/users', verifyToken, allowedto(userRole.ADMIN), getAllUsers);
userRouter.get('/user/:id', verifyToken, allowedto(userRole.ADMIN), getUserById);
userRouter.patch('/updateuser/:id', verifyToken, allowedto(userRole.ADMIN, userRole.USER), updateUser);
userRouter.delete('/deleteuser/:id', verifyToken, allowedto(userRole.ADMIN, userRole.USER), deleteUser);
export default userRouter;