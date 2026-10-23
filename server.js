import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

dotenv.config();

console.log(
    "API KEY:",
    process.env.GEMINI_API_KEY ? "FOUND" : "NOT FOUND"
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const AI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function generateWithRetry(prompt) {
    const models = ["gemini-3.8-flash", "gemini-3.6-flash"];
    for (const model of models) {
        for (let attempt = 0; attempt < 2; attempt++) {
            try {
                return await AI.models.generateContent({ model, contents: prompt });
            } catch (err) {
                if (err.status !== 503) throw err;
                await new Promise(r => setTimeout(r, 1500));
            }
        }
    }
    throw new Error("The AI is busy right now. Please try again in a minute.");
}

app.post("/ask-gemini", async (req, res) => {
    try {
        const question = req.body.question;
        if (!question) {
            return res.status(400).json({
                error: "question is required"
            });
        }

        const response = await generateWithRetry(
            `Give me a short explanation of ${question}.
            Do not use Markdown, asterisks (*), bold text, or special formatting.
            Use plain text only.`
        );

        res.json({
            answer: response.text
        });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});