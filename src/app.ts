import compression from "compression";
import cors from "cors";
import express from "express";
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

const getMessage = async (text: string): Promise<string> => {
  const chatCompletion = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: text,
          },
        ],
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return chatCompletion.choices.map((choice) => choice.message.content).join("\n");
};

app.post("/api/chat", async (req, res) => {
  const keyword: string = req.body.message;

  const questionTitle = await getMessage(["次のキーワードを元にアルゴリズムの問題タイトルをを考えてください", keyword].join("\n"));
  const questionBody = await getMessage(
    [
      "次の問題タイトルを元にアルゴリズムの問題本文を提案してください。",
      "ただし、この問題はテスト可能な問題としてください。",
      questionTitle,
    ].join("\n"),
  );

  const [questionBodyEn, answerJs, answerRuby, testCase] = await Promise.all([
    getMessage(["次の文章を英語に翻訳してください", questionBody].join("\n")),
    getMessage(["次の問題を解いて、JavaScriptの解答コードを提案してください", questionBody].join("\n")),
    getMessage(["次の問題を解いて、Rubyの解答コードを提案してください", questionBody].join("\n")),
    getMessage(["次の問題をテストするテストケースを提案してください", questionBody].join("\n")),
  ]);

  res.send({
    questionTitle: questionTitle,
    questionBody: questionBody,
    questionBodyEn: questionBodyEn,
    answerJS: answerJs,
    answerRuby: answerRuby,
    testCase: testCase,
  });
  res.end();
});

app.listen(10010, () => {
  console.log(`Start: http://localhost:10010`);
});
