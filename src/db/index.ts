import {Pool, QueryResult} from 'pg';

const pool = new Pool();

export const query = (text: string, params = []): Promise<QueryResult> =>
  pool.query(text, params);
