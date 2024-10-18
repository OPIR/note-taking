import express from "express";
import { AuthController } from "./auth.controller";

export class AuthRouter {
  private ctrl = new AuthController();
  public router: express.Router = express.Router();

  constructor() {
    this.router.post("/sign-in", this.ctrl.signIn);
    this.router.post("/sign-up", this.ctrl.signUp);
  }
}
