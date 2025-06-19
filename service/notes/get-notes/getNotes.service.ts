import { database } from "../../../database/config/config.database";
import type { NotesWithTags } from "../../../database/models/notes.model";
import { extractNotesFromSeparatedArr } from "./get-notes-with-tags/get-all-notes-with-tags/extractNotesFromSeparatedArr";
import { removeDuplicatedIds } from "./get-notes-with-tags/get-all-notes-with-tags/removeDuplicatedIds";
import { separateNotesById } from "./get-notes-with-tags/get-all-notes-with-tags/separateRepeatedNotesById";

export async function getNotesByIdService(id: number) {
  const dbQuery = database.query(
    `SELECT title, body FROM notes WHERE id = $id`
  );

  try {
    return dbQuery.get({ id });
  } catch (err) {
    console.error(err);
  }
}

