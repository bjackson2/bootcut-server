import {withFilter} from 'graphql-subscriptions';
import db from '../../db';

export const TURN_ORDER_UPDATED_TOPIC = 'turn_order_updated';

export default {
  subscribe: withFilter(
    () => db.pubsub.asyncIterator(TURN_ORDER_UPDATED_TOPIC),
    (payload, variables) =>
      payload.turnOrderUpdated.gameCode === variables.gameCode
  ),
};
