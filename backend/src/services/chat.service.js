import { getPortfolioContext } from "./portfolio.service.js";
import { generateAnswer } from "./llm.service.js";
export const processMessage = async (message) => {
    const portfolio = getPortfolioContext();

    const answer = await generateAnswer(
        message,
        portfolio
    );

    return {
        role: "assistant",
        content: answer,
    };
};