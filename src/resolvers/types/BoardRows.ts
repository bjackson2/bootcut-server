import {Context, BoardRowRow} from '../../types';
import {Game, BoardRow} from '../../models';

export default async (
  parent: Game,
  _args: Record<string, any>,
  context: Context
): Promise<BoardRow[]> => {
  const res = await context.db.query(
    `
      SELECT *
        FROM board_rows
        WHERE board_rows.game_id = $1
        ORDER BY board_rows.row_number ASC
    `,
    [parent.id]
  );
  return res.rows.map((row: BoardRowRow) => new BoardRow(row));
};
