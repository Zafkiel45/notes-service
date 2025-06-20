import type { NotesWithTags } from "../database/models/notes.model";

export function extractNotesFromSeparatedArr(separatedNotes: NotesWithTags[][]) {
  return separatedNotes.map((notesArr) => {
    const tagNames = notesArr.flatMap((tag) => tag.tag_name);
    const tagIds = notesArr.flatMap((tag) => tag.tag_id);
    const note = (notesArr as NotesWithTags[])[0] as NotesWithTags;

    note.tag_name = tagNames;
    note.tag_id = tagIds;

    return note;
  });
}
