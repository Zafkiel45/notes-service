import { database } from "../../database/config/config.database";
import { DatabaseError } from "../../errors/databaseError.error";

export async function createNoteService(title: string, body: string) {
  const dbQuery = database.prepare(`
    INSERT INTO notes (title, body) VALUES ($title, $body)
  `);

  try {
    await database.transaction(() => {dbQuery.run({title,body})})();
  } catch {
    throw new DatabaseError("The note was not created successfully");
  };
};


