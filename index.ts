import './database/migrations/migrations.database';
import { createNoteRoute } from './routes/createNotes.route';
import { deleteNoteByIdRoute } from './routes/deleteNotes.route';
import { getNoteByIdRoute } from './routes/getNotes.route';
import { addTagsForNoteRoute, updateNoteByIdRoute } from './routes/updateNotes.route';

const app = Bun.serve({
  port: 3001,
  idleTimeout: 0,
  routes: {
    "/notes": {
      "POST": createNoteRoute,
    },
    "/notes/addTags": {
      "POST": addTagsForNoteRoute,
    },
    "/notes/:id": {
      DELETE: deleteNoteByIdRoute,
      GET: getNoteByIdRoute,
      PATCH: updateNoteByIdRoute,
    },
  }
});

console.log('Backend started at', app.port);