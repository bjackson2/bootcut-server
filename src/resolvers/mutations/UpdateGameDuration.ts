import {Context} from '../../types';
import {Game} from '../../models';

interface UpdateGameDurationArgs {
  code: string;
  duration?: number;
}

export default async (
  _parent: undefined,
  args: UpdateGameDurationArgs,
  context: Context
): Promise<Game> => {
  const res = await context.db.query(
    `
      UPDATE games
        SET duration = $1
        WHERE games.code = $2
        RETURNING *
    `,
    [args.duration, args.code]
  );

  const game = new Game(res.rows[0]);

  return game;
};
