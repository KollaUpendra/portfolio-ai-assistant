import express from "express";
import { 
    handleCreateChatSession, 
    handleSendChatMessage, 
    handleCloseChatSession 
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/session/start", handleCreateChatSession);
router.post("/session/close", handleCloseChatSession);
router.post("/message", handleSendChatMessage);

export default router;
