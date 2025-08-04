import express from "express";
import { getAllMessage, sendMessage } from "../Controllers/message.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/send',sendMessage);
//get all message
router.get('/getall', isAdminAuthenticated, getAllMessage);


export default router;