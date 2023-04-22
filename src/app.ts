import cors from "cors";
import express from "express";

const SERVER_PORT = Number(process.env.PORT ?? 3000);

const createServer = (): express.Application => {
  const app = express();
  app.use(cors());

  app.get("*", (req: express.Request, res: express.Response) => {
    res.json({ query: req.query });
    res.end();
  });

  return app;
};

const server = createServer();

if (import.meta.env.PROD) {
  server.listen(SERVER_PORT, () => {
    console.log(`Serve start: http://localhost:${SERVER_PORT}`);
  });
} else {
  console.info(`[INFO] Run Debug Server`);
}

export const viteNodeApp = server;
