import {Game, Games, BoardRows, GameParticipants} from './types';
import {
  UpdateBoardRow,
  CreateGame,
  CreateGameParticipant,
  UpdateGameDuration,
} from './mutations';
import {
  BoardRowUpdated,
  GameParticipantCreated,
  TurnOrderUpdated,
} from './subscriptions';

export default {
  Query: {
    game: Game,
    games: Games,
  },
  Subscription: {
    boardRowUpdated: BoardRowUpdated,
    gameParticipantCreated: GameParticipantCreated,
    turnOrderUpdated: TurnOrderUpdated,
  },
  Mutation: {
    createGame: CreateGame,
    createGameParticipant: CreateGameParticipant,
    updateBoardRow: UpdateBoardRow,
    updateGameDuration: UpdateGameDuration,
  },
  Game: {
    boardRows: BoardRows,
    gameParticipants: GameParticipants,
  },
};
