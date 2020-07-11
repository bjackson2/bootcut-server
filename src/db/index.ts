import {Pool, QueryResult} from 'pg';

const pool = new Pool();

export const query = (
  text: string,
  params: Array<string | number> = []
): Promise<QueryResult> => pool.query(text, params);
