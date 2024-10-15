import mongoose, { Schema } from "mongoose";

export interface INote {
  title: String;
  author: String;
  isPublic: Boolean;
  note: String;
}

const noteSchema: Schema = new Schema<INote>({});

export const Note = mongoose.model("Blog", noteSchema);
