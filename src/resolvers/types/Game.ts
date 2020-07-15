import {Context, Game, GameArgs} from '../../types';

export default async (
  _parent: Record<string, any>,
  args: GameArgs,
  context: Context
): Promise<Game> => {
  const res = await context.db.query(
    'SELECT * from games WHERE games.short_code = $1',
    [args.id]
  );
  return res.rows[0];
};
