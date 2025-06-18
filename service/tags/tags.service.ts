import { database } from "../../database/config/config.database";

export function createOrGetTagService(name: string): number {
  try {
    const tagId = getTagService(name);
    if(!tagId?.id) throw new Error();
    return tagId.id;
  } catch {
    return createTagService(name);
  };
};

function getTagService(name: string) {
  const dbQuery = database.query(`SELECT id FROM tags WHERE name = $name`);

  try {
    return dbQuery.get({name}) as {id: number};
  } catch(err) {
    console.error(err);
  }
};

function createTagService(name: string) {
  try {
   const dbString = database.prepare(`INSERT INTO tags (name) VALUES ($name)`);
   const tagId = database.transaction(() => dbString.run({name}).lastInsertRowid);
   return tagId();
  } catch(err) {
    console.log(err);
  }
};