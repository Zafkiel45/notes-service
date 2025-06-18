import { addTagForNoteService, updateNoteByIdService } from "../service/notes/updateNotes.service";
import { ApiError } from "../errors/ApiError.error";
import type { BunRequest } from "bun";
import { isInvalidId } from "../middleware/isInvalidNumber.middleware";
import { isMaliciousString } from "../middleware/isInvalidInput.middleware";
import { isInvalidString } from "../middleware/isInvalidString.middleware";


export async function addTagsForNoteRoute(req: BunRequest<"/notes/addTags">) {
  const { noteName, tags} = await req.json() as {noteName: string, tags: string[]};
  
  if(isMaliciousString(noteName)){
    throw new ApiError(400, "Bad Request", "Invalid Input");
  };

  for(const tag of tags) {
    if(isMaliciousString(tag)){
      throw new ApiError(400, "Bad Request", "Invalid Input");
    };
  };

  try {
    await addTagForNoteService(noteName, tags);
    return Response.json(
      {message: `Tags Added for ${noteName} added successfuly`},
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
      {message: "Unknown Error", err},
      {status: 500, statusText: "Internal Server Error"}
    );
  };
};

export async function updateNoteByIdRoute(req: BunRequest<"/notes/:id">) {
  const id = parseInt(req.params.id);
  const { title, body } = await req.json() as {title: string, body: string};

  try { 
    isInvalidId(id);
    isMaliciousString(title);
    if(title.trim() === '' && body.trim() === '') {
      throw new ApiError(400, "Bad Request", 'The fields are empty')
    }
  
    await updateNoteByIdService(body, title, id);
    return Response.json({},{status: 200, statusText: "Ok"});
  } catch(err) {
    if(err instanceof ApiError) {
      return Response.json(
        {error: err.message}, 
        {status: err.status, statusText: err.statusText}
      );
    };

    return Response.json(
      {message: "Unknown Error", err},
      {status: 500, statusText: "Internal Server Error"}
    );
  };
};
