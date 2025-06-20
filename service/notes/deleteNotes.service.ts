import { database } from "../../database/config/config.database";
import { DatabaseError } from "../../errors/databaseError.error";

export async function deleteNoteByIdService(id: number) {
  const dbQuery = database.prepare(`DELETE FROM notes WHERE id = $id`);
  try {
    database.transaction(() => {dbQuery.run({id})})();
  } catch {
    throw new DatabaseError("The note was not deleted successfully");
  }
};