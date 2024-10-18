import { IRequest, IResponse } from "../core/core.models";
import { INote, NoteSchema } from "./note.models";
import mongoose from "mongoose";

export class NoteController {
  private Notes = mongoose.model("Note", NoteSchema);

  public async getAllMyNotes(req: IRequest, res: IResponse): Promise<void> {
    const notes = await this.Notes.find<INote>();
    console.log(res);

    res.json(notes);
  }

  public async createNote(req: IRequest, res: IResponse): Promise<void> {
    const note = this.Notes.create();

    res.json(note);
  }
}
