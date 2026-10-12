import { getPortfolioContext } from "./portfolio.service.js";
import { generateChatAnswer } from "./llm.service.js";

/**
 * Processes an incoming user message by attaching conversation context and generating an answer.
 * @param {string} userMessage - The raw message input from the user.
 * @param {Array<{role: string, content: string}>} sessionHistory - Previous conversation turns.
 * @returns {Promise<{role: string, content: string}>} Generated assistant response message object.
 */
export const processIncomingChatMessage = async (userMessage, sessionHistory = []) => {
    const portfolioContext = getPortfolioContext();

    // Prepare full conversation messages list including the current user message
    const conversationMessages = [
        ...(Array.isArray(sessionHistory) ? sessionHistory : []),
        { role: "user", content: userMessage },
    ];

    const answer = await generateChatAnswer(portfolioContext, conversationMessages);

    return {
        role: "assistant",
        content: answer,
    };
};