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
          activity_description varchar(200)
        )
      `
  );
};

setup();
