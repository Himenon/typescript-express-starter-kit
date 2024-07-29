import compression from "compression";
import cors from "cors";
import * as express from "express";
import OpenAI from "openai";

console.log("HEUY");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.disable("x-powered-by");
app.use(compression());
app.use(
  // 4mb limit for image uploads.
  express.json({
    limit: "4mb",
  }),
);

app.use(cors()); // only development

app.post("/chat/create/reply", async (req, res) => {
  console.log(req.body);
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Say this is a test",
          },
        ],
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(chatCompletion);

  res.end();
});

app.listen(10010, () => {
  console.log(`Start: http://localhost:10010`);
});
