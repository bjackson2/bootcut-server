import {Context} from '../../types';
import {GameParticipant} from '../../models';

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
  const res = await context.db.query(
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

  return new GameParticipant(res.rows[0]);
};
