import {Context, GameRow} from '../../types';
import {Game} from '../../models';

export default async (
  _parent: Record<string, any>,
  _args: Record<string, any>,
  context: Context
): Promise<Game[]> => {
  const res = await context.db.query('SELECT * from games');
  return res.rows.map((r: GameRow) => new Game(r));
};
