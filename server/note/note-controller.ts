import db from "../db/db-connector";
import { INote } from "./note-models";

export class NoteController {
  public async getAllMyNotes(): Promise<INote[]> {
    const notes = db.collection("notes");
    const res = await notes.find().toArray();
    console.log(res);

    return;
  }
}
