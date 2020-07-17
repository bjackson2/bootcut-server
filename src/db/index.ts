import {Pool, QueryResult} from 'pg';
import dotenv from 'dotenv';
// @ts-ignore
import {PostgresPubSub} from 'graphql-postgres-subscriptions';

dotenv.config();

const pool = new Pool();
const pubsub = new PostgresPubSub({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

export default {
  query: (
    text: string,
    params: Array<string | number> = []
  ): Promise<QueryResult> => pool.query(text, params),
  pubsub,
};
