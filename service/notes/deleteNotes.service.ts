import { database } from "../../database/config/config.database";

export async function deleteNoteByIdService(id: number) {
  const dbQuery = database.prepare(`DELETE FROM notes WHERE id = $id`);
  try {
    database.transaction(() => {dbQuery.run({id})})();
  } catch (err) {
    console.error(err);
  }
};