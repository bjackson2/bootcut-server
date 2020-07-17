import {Context} from '../../types';
import {Game} from '../../models';
import generateGameCode from '../../utilities/generateGameCode';

export default async (
  _parent: undefined,
  _args: undefined,
  context: Context
): Promise<Game> => {
  const code = generateGameCode();
  const res = await context.db.query(
    `
      INSERT INTO games(code)
        VALUES($1)
        RETURNING *
    `,
    [code]
  );

  const game = new Game(res.rows[0]);

  await context.db.query(
    `
      INSERT INTO board_rows(row_number, game_id)
        VALUES
        ${[...Array(12).keys()].map(idx => `(${idx + 1}, $1)`).join(', ')}
    `,
    [game.id]
  );

  return game;
};
