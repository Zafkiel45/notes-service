import { database } from "../../database/config/config.database";
import { createOrGetTagService } from "../tags/tags.service";

export async function addTagForNoteService(noteTitle: string, tagsName: string[]) {
  const getNoteId = database.query(`SELECT id FROM notes WHERE title = $title`);
  const addTagForNote = database.prepare(`
    INSERT INTO note_tags (note_id, tag_id) VALUES ($note, $tag)
  `);
 
    try {
      const noteId = getNoteId.get({title: noteTitle}) as {id: number}; 
      
      database.transaction(() => {
        for(let tag of tagsName) {
          const tagId = createOrGetTagService(tag);
          addTagForNote.run({
            note: noteId.id,
            tag: tagId,
          });
        };
      })();
    } catch (err) {
      console.error(err);
    };
};

export async function updateNoteByIdService(
  body: string, 
  title: string, 
  id: number,
) {
  const queryBase   = 'UPDATE notes SET';
  const queryCondition = 'WHERE id = $id';
  const queryParams = {id} as {body: string, title: string, id: number};
  let queryChunks = [];

  if(body.trim() !== '' && typeof body !== 'undefined') {
    queryChunks.push('body = $body');
    queryParams.body = body;
  };

  if(title.trim() !== '' && typeof title !== 'undefined') {
    queryChunks.push('title = $title');
    queryParams.title = title; 
  };

  const dbQuery = database.prepare(`${queryBase + " " + queryChunks.join(',') + " " + queryCondition}`);

  try {
    database.transaction(() => dbQuery.run(queryParams))();
  } catch(err) {
    console.error(err);
  }
};
