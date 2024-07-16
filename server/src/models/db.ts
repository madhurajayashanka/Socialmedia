import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = open({
  filename: ":memory:",
  driver: sqlite3.Database,
}).then(async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      titleColor TEXT
    );
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      postId TEXT,
      content TEXT,
      FOREIGN KEY (postId) REFERENCES posts (id)
    );
  `);
  return db;
});

export default dbPromise;
