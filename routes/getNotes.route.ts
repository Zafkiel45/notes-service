import type { BunRequest } from "bun";
import { getNotesByIdService } from "../service/notes/getNotes.service";
import { isInvalidId } from "../middleware/isInvalidNumber.middleware";
import { ApiError } from "../errors/ApiError.error";

export async function getNoteByIdRoute(req: BunRequest<"/notes/:id">) {
  const id = parseInt(req.params.id);

  try {
    isInvalidId(id);
    const note = await getNotesByIdService(id);
    return Response.json(
      {content: note},
      {status: 200, statusText: "Ok"},
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
