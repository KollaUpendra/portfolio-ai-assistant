import express from "express";
import chatrouter from "./routes/chat.routes.js";

const app = express();

app.use(express.json());
app.use("/api/chat", chatrouter);

app.get("/", (req, res) => {
    console.log("running");
    res.json({message : "running"})
})

export default app;