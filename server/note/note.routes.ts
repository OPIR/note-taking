import express from "express";
import { NoteController } from "./note.controller";
import { INextFunction, IRequest, IResponse } from "../core/core.models";

export class NoteRouter {
  private ctrl = new NoteController();
  public router: express.Router = express.Router();

  constructor() {
    this.router.get("/", (req: IRequest, res: IResponse, next: INextFunction) =>
      this.ctrl.getAllMyNotes(req, res)
    );
    this.router.get(
      "/:noteId",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.getNoteById(req, res)
    );

    this.router.post(
      "/",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.createNote(req, res)
    );
  }
}
