import snakeCase from 'lodash.snakecase';
import {query} from '../db';
import {GraphQLResolveInfo} from 'graphql';

interface BoardRow {
  id: number;
  row_number: number;
  activity_description: string;
}

interface UpdateBoardRowArgs {
  rowNumber: number;
  activityDescription: string;
}

export function fieldResolver<T>(
  source: Record<string, any>,
  _args: Record<string, any>,
  _contextValue: Record<string, any>,
  info: GraphQLResolveInfo
): T {
  return source[snakeCase(info.fieldName)];
}

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

      console.log(res);
      return res.rows[0];
    },
  },
};
