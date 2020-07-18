import {Context} from '../../types';
import db from '../../db';
import {BOARD_ROW_UPDATED_TOPIC} from '../subscriptions/BoardRowUpdated';
import {BoardRow} from '../../models';

interface UpdateBoardRowArgs {
  gameCode: string;
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
            SELECT id FROM games WHERE games.code = $1
          )
        RETURNING *
    `,
    [args.gameCode, args.rowNumber, args.activityDescription]
  );

  const boardRow = new BoardRow(res.rows[0]);

  db.pubsub.publish(BOARD_ROW_UPDATED_TOPIC, {
    boardRowUpdated: {
      id: boardRow.id,
      gameCode: args.gameCode,
      rowNumber: boardRow.rowNumber,
      activityDescription: boardRow.activityDescription,
    },
  });

  return boardRow;
};
