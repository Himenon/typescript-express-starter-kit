import compression from "compression";
import cors from "cors";
import express from "express";
import * as fs from "fs";
import OpenAI from "openai";

console.log("HEUY");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.disable("x-powered-by");
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // only development

app.post("/api/chat", async (req, res) => {
  console.log(req.body.message);
  const message: string = req.body.message;
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: message,
          },
        ],
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(chatCompletion);

  fs.writeFileSync("debug.json", JSON.stringify(chatCompletion, null, 2), "utf-8");

  res.send({
    message: chatCompletion.choices.map((choice) => choice.message.content).join("\n"),
  });
  res.end();
});

app.listen(10010, () => {
  console.log(`Start: http://localhost:10010`);
});
