import express from "express";
import { createMessage, listMessages } from "../controllers/message.controller.js";
import verifyToken from './../middleware/verifyToken.js';
import allowedto from "../middleware/allowedto.js";
import userRole from "../configs/user.role.js";


const messageRouter = express.Router();

// messageRouter.post('/send', verifyToken, allowedto(userRole.USER, userRole.ADMIN) ,createMessage);
messageRouter.post('/send',createMessage);
messageRouter.get('/messages',listMessages);
export default messageRouter