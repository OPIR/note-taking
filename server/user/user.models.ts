import mongoose, { InferRawDocType, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import { isValidEmail } from "../core/validator.utils";

const saltRounds = 8;

const userSchemaDefinition = {
  fName: { type: String, required: true, maxLength: 32 },
  lName: { type: String, required: true, maxLength: 32 },
  email: {
    type: String,
    required: true,
    index: { unique: true },
    validate: {
      validator: isValidEmail,
      message: "{VALUE} is not a valid email",
      isAsync: false,
    },
  },
  password: { type: String, required: true },
};

export type IUser = InferRawDocType<typeof userSchemaDefinition>;

const UserSchema: Schema = new Schema<IUser>(userSchemaDefinition);

UserSchema.pre("save", async function (next: NextFunction) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    user.password = await bcrypt.hash(user.password as string, saltRounds);
  }
  next();
});

export const Users = mongoose.model("User", UserSchema);
