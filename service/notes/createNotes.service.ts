import { database } from "../../database/config/config.database";

export async function createNoteService(title: string, body: string) {
  const dbQuery = database.prepare(`
    INSERT INTO notes (title, body) VALUES ($title, $body)
  `);

  try {
    await database.transaction(() => {dbQuery.run({title,body})})();
  } catch (err) {
    console.error(err);
  };
};


