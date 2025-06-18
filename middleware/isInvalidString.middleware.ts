import { ApiError } from "../errors/ApiError.error";

export function isInvalidString(input: string) {
  if (!input) {
    throw new ApiError(400, "Bad Request", "The input is Null");
  };
  if (typeof input !== "string") {
    throw new ApiError(400, "Bad Request", "The input is not a string");
  };
  if (input.trim() === "") {
    throw new ApiError(400, "Bad Request", "The input is empty");
  };
};
