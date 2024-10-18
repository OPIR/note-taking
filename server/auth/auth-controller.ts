import mongoose from "mongoose";
import { IUser, UserSchema } from "../user/user.models";
import { generateToken } from "./auth-middleware";
import bcrypt from "bcrypt";
import { WithId } from "mongodb";
import { IRequest, IResponse } from "../core/core.models";

export class AuthController {
  public async signIn(req: IRequest, res: IResponse): Promise<void> {
    const User = mongoose.model("User", UserSchema);
    const user = await User.findOne<WithId<IUser>>({
      email: req.body.email,
    });

    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send(generateToken(user));
    } else {
      res.status(401).send("Wrong credentials!");
    }
  }

  public async signUp(req: IRequest, res: IResponse): Promise<void> {
    const User = mongoose.model("User", UserSchema);

    try {
      await User.create(req.body);
      const user = await User.findOne<WithId<IUser>>({ email: req.body.email });

      res.send(generateToken(user));
    } catch (err) {
      console.log(err);
      res.status(401).send(err);
    }
  }
}
