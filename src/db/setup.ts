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
  await executeStatement('DROP TABLE IF EXISTS board_rows');
  await executeStatement('DROP TABLE IF EXISTS games');
  await executeStatement(
    `
        CREATE TABLE games (
          id serial PRIMARY KEY,
          short_code varchar(14) NOT NULL UNIQUE,
          name varchar(255) NOT NULL DEFAULT ''
        )
      `
  );
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
};

setup();
