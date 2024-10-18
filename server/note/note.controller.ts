import { IRequest, IResponse } from "../core/core.models";
import { NoteHelper } from "./note.helper";
import { INote } from "./note.models";

export class NoteController {
  private noteHelper: NoteHelper;

  constructor() {
    this.noteHelper = new NoteHelper();
  }

  public async getAllMyNotes(req: IRequest, res: IResponse): Promise<void> {
    this.noteHelper.getMyNotes(req.user).then(
      (notes: INote[]) => {
        res.send(notes);
      },
      (err) => {
        res.status(err.status || 500).send(err.message);
      }
    );
  }

  public async getNoteById(req: IRequest, res: IResponse): Promise<void> {
    try {
      this.noteHelper.getMyNotes(req.user, req.params.noteId).then(
        (notes: INote[]) => {
          res.send(notes);
        },
        (err) => {
          res.status(err.status || 500).send(err.message);
        }
      );
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    }
  }

  public async createNote(req: IRequest, res: IResponse): Promise<void> {
    try {
      const note = await this.noteHelper.createNote(req.body);
      res.json(note);
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    }
  }
}
