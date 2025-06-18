import { ApiError } from "../errors/ApiError.error";

export function isInvalidId(id: number) {
  if(!id) {
    throw new ApiError(400, "Bad Request", "The id cannot be null");
  };
  
  if(!Number.isInteger(id)) {
    throw new ApiError(400, "Bad Request", "The id must be an integer");
  };

  if(id <= 0) {
    throw new ApiError(400, "Bad Request", "The id cannot be 0 or negative");
  };
}; 