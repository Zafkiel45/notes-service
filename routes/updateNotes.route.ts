import { addTagForNoteService, updateNoteByIdService } from "../service/notes/updateNotes.service";
import { ApiError } from "../errors/ApiError.error";
import type { BunRequest } from "bun";
import { isInvalidId } from "../middleware/isInvalidNumber.middleware";
import { isMaliciousString } from "../middleware/isInvalidInput.middleware";
import { isInvalidString } from "../middleware/isInvalidString.middleware";


export async function addTagsForNoteRoute(req: BunRequest<"/api/notes/:id/tags">) {
  const id = parseInt(req.params.id);
  const { tags } = await req.json() as {noteName: string, tags: string[]};
  
  try {
    isInvalidId(id);
    
    for(const tag of tags) {
      if(isMaliciousString(tag)){
        throw new ApiError(400, "Bad Request", "Invalid Input");
      };
    };

    await addTagForNoteService(id, tags);
    return Response.json({message: `Tags added successfuly`},{status: 200, statusText: "Ok"});
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

export async function updateNoteByIdRoute(req: BunRequest<"/api/notes/:id">) {
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
