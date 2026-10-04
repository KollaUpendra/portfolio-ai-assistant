import { processMessage } from "../services/chat.service.js";

export const sendMessage = async (req, res) => {
    const message = req.body.content;
    const reponse = await processMessage(message);
    res.json({ success : true, data : reponse });
};