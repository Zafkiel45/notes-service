import type { NotesWithTags } from "../../../../../database/models/notes.model";

export function separateNotesById(arrId: number[], noteArr: NotesWithTags[]) {
  const separatedRepeatedNotesById: NotesWithTags[][] = []
  arrId.map((id) => {
    const repeatedNotes = noteArr.flatMap((note) => {
      if (note.note_id === id) return note;
      return [];
    });
    separatedRepeatedNotesById.push(repeatedNotes);
  });

  return separatedRepeatedNotesById;
};
