import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is not defined in environment variables");
}

export const env = Object.freeze({
  PORT: Number(PORT),
});