import { DeleteResult, WithId } from "mongodb";
import { INote, INoteMatcher, Notes } from "./note.models";
import { UserHelper } from "../user/user.helper";
import mongoose from "mongoose";

export class NoteHelper {
  private userHelper: UserHelper;

  constructor() {
    this.userHelper = new UserHelper();
  }

  public async getNotes(userId: string, noteId?: string): Promise<INote[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let match: INoteMatcher = {
          authorId: userId,
        };

        if (noteId) match._id = noteId;

        const notes = await Notes.find<INote>(match);
        return resolve(notes);
      } catch (err) {
        console.error(err);
        reject(err.message);
      }
    });
  }
  public async getUserNotes(userId: string): Promise<INote[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let match: INoteMatcher = {
          authorId: userId,
          isPublic: true,
        };

        const notes = await Notes.find<INote>(match);
        return resolve(notes);
      } catch (err) {
        console.error(err);
        reject(err.message);
      }
    });
  }

  public async createNote(
    newNote: INote,
    authorId: string
  ): Promise<WithId<INote> | string> {
    return new Promise(async (resolve, reject) => {
      try {
        newNote.authorId = new mongoose.Types.ObjectId(authorId);
        const note = (await Notes.create<INote>(
          newNote
        )) as unknown as WithId<INote>;

        return resolve(note);
      } catch (err) {
        console.error(err);
        reject(err.message);
      }
    });
  }

  public async updateNote(noteId: string, newNote: INote, userId: string) {
    let match: INoteMatcher = {
      authorId: userId,
      _id: noteId,
    };
    const note = await Notes.updateOne(match, { $set: newNote });

    return note;
  }

  public async deleteNote(
    noteId: string,
    userId: string
  ): Promise<DeleteResult> {
    const match: INoteMatcher = {
      authorId: userId,
      _id: noteId,
    };
    const note = await Notes.deleteOne(match);

    return note;
  }
}
