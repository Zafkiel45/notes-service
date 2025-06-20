import { database } from "../../../../database/config/config.database";
import type { NotesWithTags } from "../../../../database/models/notes.model";
import { DatabaseError } from "../../../../errors/databaseError.error";
import { extractNotesFromSeparatedArr } from "../../../../utils/extractNotesFromSeparatedArr";

export async function getNotesByIdService(id: number) {
  const dbQuery = database.query(
    `SELECT 
      notes.title AS note_title,
      notes.body AS note_body, 
      tags.name AS tag_name,  
      tags.id AS tag_id
      FROM notes 
      LEFT JOIN note_tags ON notes.id = note_tags.note_id
      LEFT JOIN tags ON tags.id = note_tags.tag_id
      WHERE notes.id = $id`
  );
  
  try {
    const notes = dbQuery.all({ id }) as NotesWithTags[];
    const formatedNote = extractNotesFromSeparatedArr([notes])
    return formatedNote;
  } catch {
    throw new DatabaseError("The note was not found successfully");
  }
}

