import {BoardRow, Context} from '../../types';

interface UpdateBoardRowArgs {
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
        SET activity_description = $2
        WHERE board_rows.row_number = $1
        RETURNING *
    `,
    [args.rowNumber, args.activityDescription]
  );

  return res.rows[0];
};
