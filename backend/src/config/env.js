import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

if (!PORT) {
  throw new Error("PORT is not defined in environment variables");
}

export const env = Object.freeze({
  PORT: Number(PORT),
  GEMINI_API_KEY,
  GEMINI_MODEL
});