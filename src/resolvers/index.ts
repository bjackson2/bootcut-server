import {Game, Games, BoardRows, GameParticipants} from './types';
import {UpdateBoardRow, CreateGame, CreateGameParticipant} from './mutations';
import {BoardRowUpdated} from './subscriptions';

export default {
  Query: {
    game: Game,
    games: Games,
  },
  Subscription: {
    boardRowUpdated: BoardRowUpdated,
  },
  Mutation: {
    createGame: CreateGame,
    createGameParticipant: CreateGameParticipant,
    updateBoardRow: UpdateBoardRow,
  },
  Game: {
    boardRows: BoardRows,
    gameParticipants: GameParticipants,
  },
};
