import express from "express";
import bodyParser from "body-parser";
import { NoteRouter } from "./note/note-routes";
import path from "path";
import verifyToken from "./auth/auth-middleware";

const app = express();

const router: express.Router = express.Router();

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send("Hello from unprotected route!");
});

// Init Note routes
const noteRouter = new NoteRouter().router;
app.use("/note", verifyToken, noteRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
