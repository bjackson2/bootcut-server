import {withFilter} from 'graphql-subscriptions';
import db from '../../db';

export const BOARD_ROW_UPDATED_TOPIC = 'board_row_updated';

export default {
  subscribe: withFilter(
    () => db.pubsub.asyncIterator(BOARD_ROW_UPDATED_TOPIC),
    (payload, variables) => payload.boardRowUpdated.gameId === variables.gameId
  ),
};
