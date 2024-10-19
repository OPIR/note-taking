import { IUser, Users } from "./user.models";
import { generateToken } from "../auth/auth-middleware.utils";
import bcrypt from "bcrypt";
import { WithId } from "mongodb";
import { IRequest, IResponse } from "../core/core.models";
import { UserHelper } from "./user.helper";

export class UserController {
  private readonly userHelper: UserHelper;

  constructor() {
    this.userHelper = new UserHelper();
  }
  /**
   *
   * Verifying user password and generate new jwt token.
   *  @returns `string` - jwt token
   */
  public async signIn(req: IRequest, res: IResponse): Promise<void> {
    const user = await this.userHelper.getUserByEmail(req.body.email);
    if (
      req.body.password &&
      user &&
      bcrypt.compareSync(req.body.password, user.password)
    ) {
      res.send(generateToken(user));
    } else {
      res.status(401).send("Wrong credentials!");
    }
  }

  /**
   *
   * Create user in DB and generate jwt token.
   * @returns `string` - jwt token
   */
  public async signUp(req: IRequest, res: IResponse): Promise<void> {
    try {
      const user = await this.userHelper.createUser(req.body);
      res.send(generateToken(user));
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    }
  }
}
