import Database from "better-sqlite3";

const db = new Database("db.sqlite3");

export const createTable = (tableName: string) => {
  db.exec(`create table if not exists ${tableName} ( json JSON NOT NULL );`);
};

export const insert = (tableName: string, data: string) => {
  const statement = db.prepare(`INSERT INTO ${tableName} (json) VALUES (?)`);
  return statement.run(data);
};
