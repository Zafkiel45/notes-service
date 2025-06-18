import { database } from "../database/config/config.database";

export function createOrGetTagService(name: string): number {
  const dbQuery = database.query(`SELECT id FROM tags WHERE name = $name`);

  try {
    const tagId =  dbQuery.get({name}) as number;

    if(!tagId) throw new Error();
    return tagId;
  } catch {
   const dbQuery = database.prepare(`INSERT INTO tags (name) VALUES ($name)`);
   const tagId =  database.transaction(() => {
    return dbQuery.run({name}).lastInsertRowid 
   })();

   return tagId;
  };
};