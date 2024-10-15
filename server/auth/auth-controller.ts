import { Jwt } from "jsonwebtoken";
import db from "../db/db-connector";

export class NoteController {
  public async login(): Promise<string | Jwt> {
    const notes = db.collection("users");
    const res = await notes.find().toArray();
    console.log(res);

    return;
  }
}
