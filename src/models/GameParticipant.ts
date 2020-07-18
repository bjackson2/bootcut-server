import {GameParticipantRow} from '../types';

export default class GameParticipant {
  id: number;
  gameId: number;
  name: string;
  avatarUrl: string;
  breakawayCount: number;

  constructor(gameParticipantRow: GameParticipantRow) {
    this.id = gameParticipantRow.id;
    this.gameId = gameParticipantRow.game_id;
    this.name = gameParticipantRow.name;
    this.avatarUrl = gameParticipantRow.avatar_url;
    this.breakawayCount = gameParticipantRow.breakaway_count;
  }
}
