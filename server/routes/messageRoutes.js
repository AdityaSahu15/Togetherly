import express from 'express'
import { getChatMessages, sendMessage, sseController } from '../controllers/messageController.js';
import { upload } from '../configs/multer.js';
import { protect } from '../middlewares/auth.js';

const messageRouter=express.Router();

messageRouter.get('/:userId',sseController)
messageRouter.post('/post',upload.single('image'),protect,sendMessage)
messageRouter.post('/get',protect,getChatMessages)
messageRouter.post("/send", protect, upload.single("image"), sendMessage);


export default messageRouter;
