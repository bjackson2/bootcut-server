import {Context, Game} from '../../types';

export default async (
  _parent: Record<string, any>,
  _args: Record<string, any>,
  context: Context
): Promise<Game[]> => {
  const res = await context.db.query('SELECT * from games');
  return res.rows;
};
