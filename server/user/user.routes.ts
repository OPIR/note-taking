import express from "express";
import { UserController } from "./user.controller";
import { INextFunction, IRequest, IResponse } from "../core/core.models";

export class UserRouter {
  private ctrl = new UserController();
  public router: express.Router = express.Router();

  constructor() {
    this.router.post(
      "/sign-in",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.signIn(req, res)
    );
    this.router.post(
      "/sign-up",
      (req: IRequest, res: IResponse, next: INextFunction) =>
        this.ctrl.signUp(req, res)
    );
  }
}
