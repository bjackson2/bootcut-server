import {BoardRow, Context} from '../../types';

interface UpdateBoardRowArgs {
  gameId: string;
  rowNumber: number;
  activityDescription: string;
}

export default async (
  _parent: undefined,
  args: UpdateBoardRowArgs,
  context: Context
): Promise<BoardRow> => {
  const res = await context.db.query(
    `
      UPDATE board_rows
        SET activity_description = $3
        WHERE board_rows.row_number = $2
          AND board_rows.game_id = (
            SELECT id FROM games WHERE games.short_code = $1
          )
        RETURNING *
    `,
    [args.gameId, args.rowNumber, args.activityDescription]
  );

  return res.rows[0];
};
