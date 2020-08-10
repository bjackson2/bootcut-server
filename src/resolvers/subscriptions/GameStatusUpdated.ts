import {withFilter} from 'graphql-subscriptions';
import db from '../../db';

export const GAME_STATUS_UPDATED_TOPIC = 'game_status_updated';

export default {
  subscribe: withFilter(
    () => db.pubsub.asyncIterator(GAME_STATUS_UPDATED_TOPIC),
    (payload, variables) =>
      payload.gameStatusUpdated.gameCode === variables.gameCode
  ),
};
