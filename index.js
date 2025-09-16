import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

app.post("/send", async (req, res) => {
    try {
            console.log("Received body:", req.body, req.body.text);

        const textData = req.body.text; 

        if (!textData || typeof textData !== "string") {
            return res.status(400).json({ success: false, error: "Invalid data format" });
        }

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: textData,
            }),
        });

        const result = await response.json();

        if (result.ok) {
            res.json({ success: true });
        } else {
            res.status(500).json({ success: false, error: result.description });
        }
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Vercel requires default export
export default app;



