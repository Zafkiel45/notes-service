import { database } from "../../../../database/config/config.database";

export function getNotesBytagService(tagId: number) {
  try {
    const notes = database.query(`
      SELECT 
      notes.id as note_id,
      notes.title,
      notes.body,
      tags.name,
      tags.id
      FROM notes 
      INNER JOIN note_tags ON notes.id = note_tags.note_id
      INNER JOIN tags ON tags.id = note_tags.tag_id 
      WHERE note_tags.tag_id = $id
    `).all({id: tagId});

    return notes;
  } catch(err) {
    console.error(err);
  }
};
