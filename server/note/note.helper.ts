import { IRequestUser } from "../core/core.models";
import { INote, INoteMatcher, Notes } from "./note.models";

export class NoteHelper {
  constructor() {}
  public async getMyNotes(
    user: IRequestUser,
    noteId?: string
  ): Promise<INote[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let match: INoteMatcher = {
          authorId: user.id,
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
}
