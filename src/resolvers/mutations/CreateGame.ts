import {Context, Game} from '../../types';
import shortid from 'shortid';

interface CreateGameArgs {
  name?: string;
}

export default async (
  _parent: undefined,
  args: CreateGameArgs,
  context: Context
): Promise<Game> => {
  const shortCode = shortid.generate();
  const res = await context.db.query(
    `
      INSERT INTO games(name, short_code)
        VALUES($1, $2)
        RETURNING *
    `,
    [args.name, shortCode]
  );
  await context.db.query(
    `
      INSERT INTO board_rows(row_number, game_id)
        VALUES
        ${[...Array(12).keys()].map(idx => `(${idx + 1}, $1)`).join(', ')}
    `,
    [res.rows[0].id]
  );

  return res.rows[0];
};
