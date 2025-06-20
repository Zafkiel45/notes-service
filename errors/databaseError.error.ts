export class DatabaseError extends Error{
  status = 500;
  statusText = "Internal Error Server";

  constructor(message: string) {
    super(message);
  };
};