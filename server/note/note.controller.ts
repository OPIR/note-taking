import { ObjectId } from "mongodb";
import { IRequest, IResponse } from "../core/core.models";
import { INote, Notes } from "./note.models";
import mongoose from "mongoose";

export class NoteController {
  public async getAllMyNotes(req: IRequest, res: IResponse): Promise<void> {
    try {
      const notes = await Notes.find<INote>({
        authorId: req.user.id,
      });
      res.json(notes);
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    }
  }

  public async getNoteById(req: IRequest, res: IResponse): Promise<void> {
    try {
      const note = await Notes.findOne<INote>({
        _id: req.params.noteId,
        authorId: req.user.id,
      });
      res.json(note);
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    }
  }

  public async createNote(req: IRequest, res: IResponse): Promise<void> {
    try {
      const note = await Notes.create(req.body);
      res.json(note);
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    }
  }
}
