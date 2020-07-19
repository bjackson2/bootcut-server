import {withFilter} from 'graphql-subscriptions';
import db from '../../db';

export const GAME_PARTICIPANT_CREATED_TOPIC = 'game_participant_created';

export default {
  subscribe: withFilter(
    () => db.pubsub.asyncIterator(GAME_PARTICIPANT_CREATED_TOPIC),
    (payload, variables) =>
      payload.gameParticipantCreated.gameCode === variables.gameCode
  ),
};
