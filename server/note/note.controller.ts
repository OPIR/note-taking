import { IRequest, IResponse } from "../core/core.models";
import { NoteHelper } from "./note.helper";
import { INote } from "./note.models";

export class NoteController {
  private noteHelper: NoteHelper;

  constructor() {
    this.noteHelper = new NoteHelper();
  }

  public async getMyNotes(req: IRequest, res: IResponse): Promise<void> {
    this.noteHelper.getNotes(req.user.id).then(
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
      this.noteHelper.getNotes(req.user.id, req.params.noteId).then(
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

  public async getNotesByUserId(req: IRequest, res: IResponse): Promise<void> {
    try {
      this.noteHelper.getUserNotes(req.params.userId).then(
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

  public async updateNote(req: IRequest, res: IResponse): Promise<void> {
    try {
      const response = await this.noteHelper.updateNote(
        req.params.noteId,
        req.body,
        req.user.id
      );

      if (response.upsertedCount > 0) {
        const updatedNote = await this.noteHelper.getNotes(
          req.user.id,
          req.params.noteId
        );
        res.json(updatedNote);
      } else if (response.matchedCount > 0 && response.modifiedCount === 0) {
        res.send("Note isn't updated! Properties are the same.");
      } else if (response.matchedCount === 0) {
        res.send(`Coudln't find note with id: ${req.params.noteId}`);
      } else {
        res.send("Something went wrong! Please contact admin for help.");
      }
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    }
  }

  public async deleteNote(req: IRequest, res: IResponse): Promise<void> {
    try {
      const note = await this.noteHelper.deleteNote(
        req.params.noteId,
        req.user.id
      );
      res.json(note.acknowledged);
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    }
  }
}
