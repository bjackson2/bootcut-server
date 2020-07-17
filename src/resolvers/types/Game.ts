import {Context} from '../../types';
import {Game} from '../../models';

interface GameArgs {
  code: string;
}

export default async (
  _parent: unknown,
  args: GameArgs,
  context: Context
): Promise<Game> => {
  const res = await context.db.query(
    'SELECT * from games WHERE games.code = $1 LIMIT 1',
    [args.code]
  );

  return new Game(res.rows[0]);
};
