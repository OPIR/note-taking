import express from "express";
import { NoteController } from "./note.controller";

export class NoteRouter {
  private ctrl = new NoteController();
  public router: express.Router = express.Router();

  constructor() {
    this.router.get("/", this.ctrl.getAllMyNotes);
    this.router.get("/:noteId", this.ctrl.getNoteById);

    this.router.post("/", this.ctrl.createNote);
  }
}
