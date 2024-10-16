import express from "express";
import bodyParser from "body-parser";
import { NoteRouter } from "./note/note.routes";
import { UserRouter } from "./user/user.routes";
import { verifyToken } from "./auth/auth-middleware.utils";
import { initDBConnection } from "./db/db-connector";
import { IRequest, IResponse } from "./core/core.models";

const app = express();

const router: express.Router = express.Router();

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

router.get("/", (req: IRequest, res: IResponse) => {
  res.send("Hello from unprotected route!");
});

// Init Note routes
const noteRouter = new NoteRouter().router;
const authRouter = new UserRouter().router;

app.use("/api/note", verifyToken, noteRouter);
app.use("/api/auth/", authRouter);

const port = 3000;

async function startServer(): Promise<void> {
  await initDBConnection();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
