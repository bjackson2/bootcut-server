import {Game, Games, BoardRows, GameParticipants} from './types';
import {
  UpdateBoardRow,
  CreateGame,
  CreateGameParticipant,
  UpdateGameDuration,
  UpdateGameStatus,
} from './mutations';
import {
  BoardRowUpdated,
  GameParticipantCreated,
  TurnOrderUpdated,
  GameStatusUpdated,
} from './subscriptions';

export default {
  Query: {
    game: Game,
    games: Games,
  },
  Subscription: {
    boardRowUpdated: BoardRowUpdated,
    gameParticipantCreated: GameParticipantCreated,
    gameStatusUpdated: GameStatusUpdated,
    turnOrderUpdated: TurnOrderUpdated,
  },
  Mutation: {
    createGame: CreateGame,
    createGameParticipant: CreateGameParticipant,
    updateBoardRow: UpdateBoardRow,
    updateGameDuration: UpdateGameDuration,
    updateGameStatus: UpdateGameStatus,
  },
  Game: {
    boardRows: BoardRows,
    gameParticipants: GameParticipants,
  },
};
