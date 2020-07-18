import dotenv from 'dotenv';
import db from './';

dotenv.config();

const executeStatement = async (statement: string) => {
  try {
    const response = await db.query(statement);
    console.log(response); // eslint-disable-line no-console
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
};

const setup = async () => {
  await executeStatement('DROP TABLE IF EXISTS board_rows');
  await executeStatement('DROP TABLE IF EXISTS games');
  await executeStatement('DROP TABLE IF EXISTS game_participants');
  await executeStatement(
    `
        CREATE TABLE games (
          id serial PRIMARY KEY,
          code char(5) NOT NULL UNIQUE,
          status smallint NOT NULL DEFAULT 0
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
  await executeStatement(
    `
        CREATE TABLE game_participants (
          id serial PRIMARY KEY,
          game_id integer REFERENCES games (id),
          name varchar(50) NOT NULL,
          avatar_url varchar(250) NOT NULL,
          breakaway_count smallint NOT NULL DEFAULT 6
        )
      `
  );
};

setup();
