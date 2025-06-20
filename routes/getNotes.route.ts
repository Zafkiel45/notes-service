import type { BunRequest } from "bun";
import { getNotesByIdService } from "../service/notes/get-notes/get-note-by-id/getNotes.service";
import { isInvalidId } from "../middleware/isInvalidNumber.middleware";
import { ApiError } from "../errors/ApiError.error";
import { getAllNotesWithTagService } from "../service/notes/get-notes/get-all-notes-with-tags/getAllNotesWithTags";
import { getNotesBytagService } from "../service/notes/get-notes/get-notes-by-tag/getNotesByTag.service";

export async function getNoteByIdRoute(req: BunRequest<"/api/notes/:id">) {
  const id = parseInt(req.params.id);

  try {
    isInvalidId(id);
    const note = await getNotesByIdService(id);
    return Response.json({ content: note }, { status: 200, statusText: "Ok" });
  } catch (err) {
    if (err instanceof ApiError) {
      return Response.json(
        { message: err.message },
        { status: err.status, statusText: err.statusText }
      );
    }

    return Response.json(
      { message: "Unknown Error" },
      { status: 500, statusText: "Internal Error Server" }
    );
  }
}

export async function getNotesWithTagsRoute() {
  try {
    const notesWithTag = await getAllNotesWithTagService();
    return Response.json(
      { notes: notesWithTag },
      { status: 200, statusText: "Ok" }
    );
  } catch (err) {
    if (err instanceof ApiError) {
      return Response.json(
        { message: err.message },
        { status: err.status, statusText: err.statusText }
      );
    }

    return Response.json(
      { message: "Unknown Error" },
      { status: 500, statusText: "Internal Error Server" }
    );
  }
}

export function getNotesByTagRoute(req: BunRequest<"/api/notes/:id/tags">) {
  const tagId = parseInt(req.params.id);
  try {
    isInvalidId(tagId);
    return Response.json(
      {notes: getNotesBytagService(tagId)}, 
      {status: 200, statusText: "Ok"}
    );
  } catch (err) {
    if (err instanceof ApiError) {
      return Response.json(
        { message: err.message },
        { status: err.status, statusText: err.statusText }
      );
    }

    return Response.json(
      { message: "Unknown Error" },
      { status: 500, statusText: "Internal Error Server" }
    );
  }
}
