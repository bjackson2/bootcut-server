import dotenv from 'dotenv';
import {query} from './index';

dotenv.config();

const executeStatement = async (statement: string) => {
  try {
    const response = await query(statement);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const setup = async () => {
  await executeStatement('DROP TABLE IF EXISTS board_rows');
  await executeStatement(
    `
        CREATE TABLE board_rows (
          id serial PRIMARY KEY,
          row_number smallint NOT NULL,
          activity_description varchar(255) NOT NULL DEFAULT ''
        )
      `
  );
  for (let i = 1; i <= 12; i++) {
    await executeStatement(
      `
        INSERT INTO board_rows(row_number)
          VALUES(${i})
      `
    );
  }
};

setup();
