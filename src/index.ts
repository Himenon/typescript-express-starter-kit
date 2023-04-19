import cors from "cors";
import express from "express";

const SERVER_PORT = 9000;

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
server.listen(SERVER_PORT, () => {
  console.log(`Serve start: http://localhost:${SERVER_PORT}`);
});
