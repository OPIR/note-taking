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
  res.send("Hello! \n This is note-task server.");
});

// Set routes
app.use("/api/note", verifyToken, new NoteRouter().router);
app.use("/api/auth", new UserRouter().router);

const port = 3000;

async function startServer(): Promise<void> {
  await initDBConnection();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
