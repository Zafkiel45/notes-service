import type { BunRequest } from "bun";
import { isInvalidId } from "../middleware/isInvalidNumber.middleware";
import { deleteNoteByIdService } from "../service/notes/deleteNotes.service";
import { ApiError } from "../errors/ApiError.error";

export async function deleteNoteByIdRoute(req: BunRequest<"/api/notes/:id">) {
  const id = parseInt(req.params.id);

  try { 
    isInvalidId(id);
    await deleteNoteByIdService(id);
    return Response.json(
      {message: "Note Deleted Successfully"},
      {status: 200, statusText: "Ok"},
    );
  } catch(err) {
    if(err instanceof ApiError) {
      return Response.json(
        {message: err.message},
        {status: err.status, statusText: err.statusText},
      );
    }

    return Response.json(
      {message: "Unknown Error"},
      {status: 500, statusText: "Internal Error Server"},
    );
  };
};