import * as express from "express";

const SERVER_PORT = 9000;

const createServer = (): express.Application => {
  const app = express();

  app.get("*", (req: express.Request, res: express.Response) => {
    res.json({ query: (req as any).query });
    res.end();
  });

  return app;
};

const server = createServer();
server.listen(SERVER_PORT, () => {
  console.log(`Serve start: http://localhost:${SERVER_PORT}`);
});
