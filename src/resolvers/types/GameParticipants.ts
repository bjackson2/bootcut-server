import {Context, GameParticipantRow} from '../../types';
import {GameParticipant, Game} from '../../models';

export default async (
  parent: Game,
  _args: Record<string, any>,
  context: Context
): Promise<GameParticipant[]> => {
  const res = await context.db.query(
    `
      SELECT *
        FROM game_participants
        WHERE game_participants.game_id = $1
        ORDER BY game_participants.id ASC
    `,
    [parent.id]
  );
  return res.rows.map((row: GameParticipantRow) => new GameParticipant(row));
};
