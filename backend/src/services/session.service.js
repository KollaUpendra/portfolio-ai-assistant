import crypto from "crypto";

// Store active sessions: sessionId -> { id, messages: [], createdAt: Date, lastActiveAt: Date }
const activeSessions = new Map();

/**
 * Creates a new chat session.
 * @returns {string} sessionId
 */
export const createChatSession = () => {
    const sessionId = crypto.randomUUID();
    activeSessions.set(sessionId, {
        id: sessionId,
        messages: [],
        createdAt: new Date(),
        lastActiveAt: new Date(),
    });
    return sessionId;
};

/**
 * Retrieves an active chat session by its ID.
 * @param {string} sessionId
 * @returns {object|null}
 */
export const getChatSessionById = (sessionId) => {
    return activeSessions.get(sessionId) || null;
};

/**
 * Appends a message to the specified chat session.
 * @param {string} sessionId
 * @param {"user"|"assistant"|"system"} role
 * @param {string} content
 * @returns {object|null} Updated session object or null if session not found
 */
export const appendMessageToSession = (sessionId, role, content) => {
    const session = activeSessions.get(sessionId);
    if (!session) return null;

    session.messages.push({ role, content });
    session.lastActiveAt = new Date();
    return session;
};

/**
 * Deletes/closes an active chat session by its ID.
 * @param {string} sessionId
 * @returns {boolean} True if deleted, false if not found
 */
export const deleteChatSessionById = (sessionId) => {
    return activeSessions.delete(sessionId);
};

