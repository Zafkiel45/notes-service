import type { BunRequest } from "bun";
import type { Notes } from "../database/models/notes.model";
import { ApiError } from "../errors/ApiError.error";
import { createNoteService } from "../service/notes/createNotes.service";
import { isMaliciousString } from "../middleware/isInvalidInput.middleware";

export async function createNoteRoute(req: BunRequest<"/api/notes">) {
  const { body, title } = (await req.json()) as Notes;

  if(isMaliciousString(body)){
    throw new ApiError(400, "Bad Request", "Invalid Input");
  };

  if(isMaliciousString(title)){
    throw new ApiError(400, "Bad Request", "Invalid Input");
  };

  try {
    await createNoteService(title, body);
    return Response.json(
      {message: "Note Successfully added"},
      {status: 200, statusText: "Ok"}
    );
  } catch (err) {
    if(err instanceof ApiError) {
      return Response.json(
        {error: err.message}, 
        {status: err.status, statusText: err.statusText}
      );
    };

    return Response.json(
      {message: "Unknown Error"},
      {status: 500, statusText: "Internal Server Error"}
    );
  };
};
