import { DeleteResult } from "mongodb";
import { INote, INoteMatcher, Notes } from "./note.models";

export class NoteHelper {
  constructor() {}
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

  public async createNote(newNote: INote) {
    const note = await Notes.create(newNote);

    return note;
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
