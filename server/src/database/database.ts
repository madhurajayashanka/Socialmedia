import sqlite3 from "sqlite3";

let db: sqlite3.Database;

export const initializeDatabase = () => {
  db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
      console.error("Error opening database", err.message);
    } else {
      console.log("Database connected");
      createTables();
    }
  });
};

const createTables = () => {
  db.run(
    `CREATE TABLE posts (
            id TEXT PRIMARY KEY,
            title TEXT,
            content TEXT,
            titleColor TEXT
        )`,
    (err) => {
      if (err) {
        console.error("Error creating posts table", err.message);
      } else {
        console.log("Posts table created");
      }
    }
  );

  db.run(
    `CREATE TABLE comments (
            id TEXT PRIMARY KEY,
            postId TEXT,
            content TEXT,
            FOREIGN KEY (postId) REFERENCES posts (id)
        )`,
    (err) => {
      if (err) {
        console.error("Error creating comments table", err.message);
      } else {
        console.log("Comments table created");
      }
    }
  );
};

export const getDb = () => db;
