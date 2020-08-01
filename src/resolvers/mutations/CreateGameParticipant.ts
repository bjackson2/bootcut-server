import {Context} from '../../types';
import {GameParticipant, Game} from '../../models';
import db from '../../db';
import {GAME_PARTICIPANT_CREATED_TOPIC} from '../subscriptions/GameParticipantCreated';
import {TURN_ORDER_UPDATED_TOPIC} from '../subscriptions/TurnOrderUpdated';

interface CreateGameParticipantArgs {
  gameCode: string;
  name: string;
  avatarUrl: string;
}

export default async (
  _parent: undefined,
  args: CreateGameParticipantArgs,
  context: Context
): Promise<GameParticipant> => {
  const gameParticipantResponse = await context.db.query(
    `
      INSERT INTO game_participants(game_id, name, avatar_url)
        VALUES(
          (SELECT id FROM games WHERE games.code = $1),
          $2,
          $3
        )
        RETURNING *
    `,
    [args.gameCode, args.name, args.avatarUrl]
  );

  const gameParticipant = new GameParticipant(gameParticipantResponse.rows[0]);

  const gameResponse = await context.db.query(
    `
      UPDATE games
        SET turn_order = array_append(turn_order, $1)
        WHERE games.code = $2
        RETURNING *
    `,
    [gameParticipant.id, args.gameCode]
  );

  const game = new Game(gameResponse.rows[0]);

  db.pubsub.publish(GAME_PARTICIPANT_CREATED_TOPIC, {
    gameParticipantCreated: {
      gameCode: args.gameCode,
      ...gameParticipant,
    },
  });
  db.pubsub.publish(TURN_ORDER_UPDATED_TOPIC, {
    turnOrderUpdated: {gameCode: args.gameCode, ...game},
  });

  return gameParticipant;
};
