import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config()

const app = express()

app.use(express.json());

app.use(express.static("public"))

const AI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

app.post("/ask-gemini" ,async(req , res)=>{

    try{
        const question = req.body.question;
        if(!question){
            return res.status(400).json({
                error:"question is required"
            })
        }

        const response = await AI.models.generateContent({
            model: "gemini-3.7-flash",
            contents:question
        })

        res.json({
            answer: response.text
        })


    }catch(error){
        res.status(500).json({
            error:"something went wrong. please try again."
        })
    }
})

app.listen(5000,()=>{
    console.log("server running at http://localhost:5000");

})