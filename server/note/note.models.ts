import mongoose, { InferRawDocType, Schema } from "mongoose";

const noteSchemaDefinition = {
  title: { type: String, required: true, maxLength: 256 },
  authorId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  isPublic: { type: Boolean, default: false },
  note: { type: String, required: true },
};

export type INote = InferRawDocType<typeof noteSchemaDefinition>;

export interface INoteMatcher {
  authorId: string;
  _id?: string;
  isPublic?: boolean;
}

const NoteSchema: Schema = new Schema<INote>(noteSchemaDefinition);

export const Notes = mongoose.model("Note", NoteSchema);
