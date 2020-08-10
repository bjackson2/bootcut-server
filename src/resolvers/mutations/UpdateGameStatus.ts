import {Context} from '../../types';
import {Game} from '../../models';
import {GameStatusType, statusEnumValue} from '../../models/Game';
import {GAME_STATUS_UPDATED_TOPIC} from '../subscriptions/GameStatusUpdated';
import db from '../../db';

interface UpdateGameStatusArgs {
  code: string;
  status: GameStatusType;
}

export default async (
  _parent: undefined,
  args: UpdateGameStatusArgs,
  context: Context
): Promise<Game> => {
  const res = await context.db.query(
    `
      UPDATE games
        SET status = $1
        WHERE games.code = $2
        RETURNING *
    `,
    [statusEnumValue(args.status), args.code]
  );

  const game = new Game(res.rows[0]);

  db.pubsub.publish(GAME_STATUS_UPDATED_TOPIC, {
    gameStatusUpdated: {gameCode: args.code, ...game},
  });

  return game;
};
