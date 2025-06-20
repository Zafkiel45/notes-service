import { database } from "../../../../database/config/config.database";
import type { NotesWithTags } from "../../../../database/models/notes.model";
import { extractNotesFromSeparatedArr } from "../../../../utils/extractNotesFromSeparatedArr";
import { removeDuplicatedIds } from "./removeDuplicatedIds";
import { separateNotesById } from "./separateRepeatedNotesById";

export async function getAllNotesWithTagService() {
  try {
    const allNotesWithTags = database
      .query(`
        SELECT 
        notes.id AS note_id,
        notes.title,
        notes.body,
        tags.id AS tag_id,
        tags.name AS tag_name
        FROM notes 
        LEFT JOIN note_tags ON notes.id = note_tags.note_id
        LEFT JOIN tags ON tags.id = note_tags.tag_id
      `).all() as NotesWithTags[];

    const allNoteIds: number[] = allNotesWithTags.map((id) => id.note_id);
    const filtedDuplicatesFromId = removeDuplicatedIds(allNoteIds);
    const separatedNotes: NotesWithTags[][] = separateNotesById(
      filtedDuplicatesFromId,
      allNotesWithTags
    );

    return extractNotesFromSeparatedArr(separatedNotes);
  } catch (err) {
    console.log(err);
  };
};
