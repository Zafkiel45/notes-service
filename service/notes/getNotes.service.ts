import { database } from "../../database/config/config.database";

export async function getNotesByIdService(id: number) {
  const dbQuery = database.query(`SELECT title, body FROM notes WHERE id = $id`);

  try { 
    return dbQuery.get({id});
  } catch(err) {
    console.error(err);
  };
};