import snakeCase from 'lodash.snakecase';
import {GraphQLResolveInfo} from 'graphql';
import {Game, BoardRows} from './types';
import {UpdateBoardRow} from './mutations';

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
    game: Game,
  },
  Mutation: {
    updateBoardRow: UpdateBoardRow,
  },
  Game: {
    boardRows: BoardRows,
  },
};
