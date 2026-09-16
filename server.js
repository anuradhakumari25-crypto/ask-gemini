import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

dotenv.config()

console.log(
    "API KEY:",
    process.env.GEMINI_API_KEY ? "FOUND" : "NOT FOUND"
);

const app = express()
app.use(cors());

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
    model: "gemini-3.5-flash",
    contents: `Give me a short explanation of ${question}.
    Do not use Markdown, asterisks (*), bold text, or special formatting.
    Use plain text only.`
})
        

        res.json({
            answer: response.text
        })
     

    }catch(error){
            console.error("Gemini API Error:", error);

    res.status(500).json({
        error: error.message

        })
    }
})

app.listen(5000,()=>{
    console.log("server running at http://localhost:5000");

})






// ========================================================================================


// import express from "express"
// const app = express()
// // app.use(express.json())

// app.get("/",(req,res)=>{
//    res.send("backend is working ")
// })

// app.listen(4000,()=>{
//     console.log("hello backend ")
// })






// import express from 'express'
// const app = express()
// app.use(express.json());

// app.post("/ask",(req,res )=>{
//     console.log(req.body)
//     res.json({
//         message:"Successed",
//         user:req.body
//     })
// })

// app.listen(4000,()=>{
//     console.log(`http://localhost:4000/ask`)
// })



// import express from 'express'
// const app = express()
// app.use(express.json());


// app.post("/ask",(req,res)=>{
//     console.log(req.body)
//     res.json({
//         mes
//     })
// })

// import express from 'express'
// const app = express()
// app.use(express.json());
// app.post("/user",(req,res)=>{
//     console.log(req.body)
//     res.send("Data received")
// })

// app.listen(4000,()=>{
//     console.log("Server is running on port 4000")
// })

// import express from 'express'
// const app = express()
// app.use(express.json)
// app.use('/ask',(req,res)=>{
//     console.log(req.body)
//     res.send("Data recived")
// })
// app.listen(3000,()=>{
//     console.log("server is running on port 3000")
// })




// import express from 'express'
// const app = express()
// app.use(express.json())
// app.use("/home",(req,res)=>{
//     console.log("hello")
// })
// app.listen(3000,()=>{})