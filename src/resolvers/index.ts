import {Game, Games, BoardRows, GameParticipants} from './types';
import {
  UpdateBoardRow,
  CreateGame,
  CreateGameParticipant,
  UpdateGame,
} from './mutations';
import {BoardRowUpdated, GameParticipantCreated} from './subscriptions';

export default {
  Query: {
    game: Game,
    games: Games,
  },
  Subscription: {
    boardRowUpdated: BoardRowUpdated,
    gameParticipantCreated: GameParticipantCreated,
  },
  Mutation: {
    createGame: CreateGame,
    createGameParticipant: CreateGameParticipant,
    updateBoardRow: UpdateBoardRow,
    updateGame: UpdateGame,
  },
  Game: {
    boardRows: BoardRows,
    gameParticipants: GameParticipants,
  },
};
