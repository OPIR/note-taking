import mongoose, { InferRawDocType, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";

const saltRounds = 8;

const userSchemaDefinition = {
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
};

export type IUser = InferRawDocType<typeof userSchemaDefinition>;

export const UserSchema: Schema = new Schema<IUser>(userSchemaDefinition);

UserSchema.pre("save", async function (next: NextFunction) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    user.password = await bcrypt.hash(user.password as string, saltRounds);
  }
  next();
});

export const User = mongoose.model("User", UserSchema);
