import snakeCase from 'lodash.snakecase';
import {query} from '../db';

interface BoardRow {
  id: number;
  row_number: number;
  activity_description: string;
}

interface UpdateBoardRowArgs {
  rowNumber: number;
  activityDescription: string;
}

export const fieldResolver = (
  source: any,
  _args: any,
  _contextValue: any,
  info: any
): any => {
  return source[snakeCase(info.fieldName)];
};

export default {
  Query: {
    boardRows: async (): Promise<BoardRow[]> => {
      const res = await query(
        'SELECT * FROM board_rows ORDER BY board_rows.row_number ASC'
      );
      return res.rows;
    },
  },
  Mutation: {
    updateBoardRow: async (
      _parent: undefined,
      args: UpdateBoardRowArgs
    ): Promise<BoardRow> => {
      const res = await query(
        `
          UPDATE board_rows
            SET activity_description = $2
            WHERE board_rows.row_number = $1
            RETURNING *
        `,
        [args.rowNumber, args.activityDescription]
      );

      return res.rows[0];
    },
  },
};
