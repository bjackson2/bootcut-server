import dotenv from 'dotenv';
import db from './';

dotenv.config();

const executeStatement = async (statement: string) => {
  try {
    const response = await db.query(statement);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const setup = async () => {
  await executeStatement('DROP TABLE IF EXISTS games');
  await executeStatement(
    `
        CREATE TABLE games (
          id serial PRIMARY KEY,
          short_code char(8) NOT NULL UNIQUE,
          name varchar(255) NOT NULL DEFAULT ''
        )
      `
  );
  await executeStatement('DROP TABLE IF EXISTS board_rows');
  await executeStatement(
    `
        CREATE TABLE board_rows (
          id serial PRIMARY KEY,
          game_id integer REFERENCES games (id),
          row_number smallint NOT NULL,
          activity_description varchar(255) NOT NULL DEFAULT ''
        )
      `
  );
  await executeStatement(
    `INSERT INTO games(short_code, name) VALUES('foo', 'a name')`
  );
  for (let i = 1; i <= 12; i++) {
    await executeStatement(
      `
        INSERT INTO board_rows(row_number, game_id)
          VALUES(${i}, (SELECT id FROM games LIMIT 1))
      `
    );
  }
};

setup();
