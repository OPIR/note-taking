import { IUser, Users } from "./user.models";
import { generateToken } from "../auth/auth-middleware.utils";
import bcrypt from "bcrypt";
import { WithId } from "mongodb";
import { IRequest, IResponse } from "../core/core.models";

export class UserController {
  public async signIn(req: IRequest, res: IResponse): Promise<void> {
    const user = await Users.findOne<WithId<IUser>>({
      email: req.body?.email,
    });

    if (bcrypt.compareSync(req.body?.password, user?.password)) {
      res.send(generateToken(user));
    } else {
      res.status(401).send("Wrong credentials!");
    }
  }

  public async signUp(req: IRequest, res: IResponse): Promise<void> {
    try {
      await Users.create(req.body);
      const user = await Users.findOne<WithId<IUser>>({
        email: req.body.email,
      });

      res.send(generateToken(user));
    } catch (err) {
      console.error(err);
      res.status(err.status || 500).send(err.message);
    }
  }
}
