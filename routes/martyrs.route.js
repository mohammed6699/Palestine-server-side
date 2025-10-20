import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import allowedto from "../middleware/allowedto.js";
import userRole from "../configs/user.role.js";
import { createNewMertyr, deleteMartyr, getAllMartyr, getMartyrById, updateMartyr } from "../controllers/martyrs.controller.js";
import { upload } from "../configs/multer.js";

const martyrRouter = express.Router();

martyrRouter.post('/newhero', upload.single("imageUrl"), verifyToken, allowedto(userRole.USER, userRole.ADMIN), createNewMertyr);
martyrRouter.get('/allheros', verifyToken, allowedto(userRole.ADMIN), getAllMartyr);
martyrRouter.get('/hero/:id', verifyToken, getMartyrById);
martyrRouter.patch('/updatehero/:id', verifyToken, allowedto(userRole.USER, userRole.ADMIN), updateMartyr);
martyrRouter.delete('/deletehero/:id', verifyToken, allowedto(userRole.ADMIN, userRole.USER), deleteMartyr);

export default martyrRouter;