import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../user/user.models";
import { INextFunction, IRequest, IResponse } from "../core/core.models";
import { WithId } from "mongodb";

const SECRET = "my_cat_name_is_Lora";

export function verifyToken(
  req: IRequest,
  res: IResponse,
  next: INextFunction
): void {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Missing token" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      SECRET
    ) as JwtPayload;
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      res.status(401).send("Your token has expired!");
      return;
    }
    if (decoded.userId && decoded.email) {
      req.user = {
        id: decoded.userId,
        email: decoded.email,
      };
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function generateToken(user: WithId<IUser>): string {
  if (!user._id || !user.email) {
    return "-1";
  }
  const token = jwt.sign(
    { userId: user._id.toString(), email: user.email },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );

  return token;
}
