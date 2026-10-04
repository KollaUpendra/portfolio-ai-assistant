import express from 'express'
import { sendMessage } from "../controllers/chat.controller.js";

const router  = express.Router();

router.get("/", (req, res) => {
    res.json({message : "chatbot is working"});
})

router.post("/message", sendMessage)

export default router;