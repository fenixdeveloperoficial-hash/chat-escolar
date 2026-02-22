const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

app.post("/chat", async (req, res) => {

    try {

        const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {

            method: "POST",

            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "user",
                        content: req.body.message
                    }
                ]

            })

        });

        const data = await resposta.json();

        res.json({
            reply: data.choices[0].message.content
        });

    } catch (erro) {

        res.json({
            reply: "Erro ao conectar com IA"
        });

    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando");
});