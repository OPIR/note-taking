import express from "express";
import { UserController } from "./user.controller";

export class UserRouter {
  private ctrl = new UserController();
  public router: express.Router = express.Router();

  constructor() {
    this.router.post("/sign-in", this.ctrl.signIn);
    this.router.post("/sign-up", this.ctrl.signUp);
  }
}
