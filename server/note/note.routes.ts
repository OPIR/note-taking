import express from "express";
import { NoteController } from "./note.controller";
import { INextFunction, IRequest, IResponse } from "../core/core.models";

export class NoteRouter {
  private ctrl = new NoteController();
  public router: express.Router = express.Router();

  constructor() {
    this.router.get(
      "/my-notes",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.getMyNotes(req, res)
    );
    this.router.get(
      "/:noteId",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.getNoteById(req, res)
    );
    this.router.get(
      "/user/:userId",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.getNotesByUserId(req, res)
    );

    this.router.post(
      "/",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.createNote(req, res)
    );

    this.router.patch(
      "/:noteId",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.updateNote(req, res)
    );

    this.router.delete(
      "/:noteId",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.deleteNote(req, res)
    );
  }
}
