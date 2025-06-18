import 'dotenv/config';
import { Database } from 'bun:sqlite';

export const database = new Database(process.env.DB_PATH, {
    strict: true,
});