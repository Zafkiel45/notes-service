import './database/migrations/migrations.database';
import { createNoteRoute } from './routes/createNotes.route';
import { deleteNoteByIdRoute } from './routes/deleteNotes.route';
import { getNoteByIdRoute, getNotesByTagRoute, getNotesWithTagsRoute } from './routes/getNotes.route';
import { addTagsForNoteRoute, updateNoteByIdRoute } from './routes/updateNotes.route';

const app = Bun.serve({
  port: 3001,
  idleTimeout: 0,
  routes: {
    "/api/notes": {
      GET: getNotesWithTagsRoute,
      POST: createNoteRoute,
    },
    "/api/notes/:id/tags": {
      GET: getNotesByTagRoute,
      POST: addTagsForNoteRoute,
    },
    "/api/notes/:id": {
      DELETE: deleteNoteByIdRoute,
      GET: getNoteByIdRoute,
      PATCH: updateNoteByIdRoute,
    },
  },
});

console.log('Backend started at', app.port);