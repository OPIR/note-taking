import { ObjectId, WithId } from "mongodb";
import { IUser, Users } from "./user.models";

export class UserHelper {
  public async getUserById(userId: ObjectId): Promise<WithId<IUser>> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await Users.findOne<WithId<IUser>>({
          _id: userId,
        });
        resolve(user);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
  public async getUserByEmail(email: string): Promise<WithId<IUser>> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await Users.findOne<WithId<IUser>>({
          email: email,
        });
        resolve(user);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  public async createUser(newUser: IUser): Promise<WithId<IUser>> {
    return new Promise(async (resolve, reject) => {
      try {
        await Users.create(newUser);
        const user = Users.findOne<WithId<IUser>>({ email: newUser.email });

        resolve(user);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
}
