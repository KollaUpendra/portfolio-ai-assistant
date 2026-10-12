import { 
    createChatSession, 
    getChatSessionById, 
    appendMessageToSession, 
    deleteChatSessionById 
} from "../services/session.service.js";
import { processIncomingChatMessage } from "../services/chat.service.js";

/**
 * Controller to handle chat session creation when the chatbot opens.
 * @route POST /api/chat/session/start
 */
export const handleCreateChatSession = (req, res) => {
    try {
        const sessionId = createChatSession();
        return res.status(201).json({
            success: true,
            sessionId,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create chat session",
            error: error.message,
        });
    }
};

/**
 * Controller to handle sending a chat message within a session.
 * @route POST /api/chat/message
 */
export const handleSendChatMessage = async (req, res) => {
    try {
        const { sessionId, content } = req.body;

        if (!sessionId || typeof sessionId !== "string") {
            return res.status(400).json({
                success: false,
                message: "A valid sessionId is required.",
            });
        }

        if (!content || typeof content !== "string" || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message content cannot be empty.",
            });
        }

        const session = getChatSessionById(sessionId);
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                message: "Session expired or not found. Please re-open the chat.",
            });
        }

        const trimmedContent = content.trim();

        // 1. Append user's message to session history
        appendMessageToSession(sessionId, "user", trimmedContent);

        // 2. Generate assistant response using message history
        const assistantResponse = await processIncomingChatMessage(
            trimmedContent, 
            session.messages
        );

        // 3. Save assistant reply to session history
        appendMessageToSession(sessionId, "assistant", assistantResponse.content);

        return res.status(200).json({ 
            success: true, 
            data: assistantResponse,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to process chat message",
            error: error.message,
        });
    }
};

/**
 * Controller to handle closing/deleting a chat session when the chatbot is closed.
 * @route POST /api/chat/session/close
 */
export const handleCloseChatSession = (req, res) => {
    try {
        const { sessionId } = req.body;

        if (sessionId) {
            deleteChatSessionById(sessionId);
        }

        return res.status(200).json({ 
            success: true, 
            message: "Session closed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to close chat session",
            error: error.message,
        });
    }
};

