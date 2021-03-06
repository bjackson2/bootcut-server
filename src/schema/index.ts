import {gql} from 'apollo-server-express';

export default gql`
  type Query {
    game(code: String!): Game!
    games: [Game!]!
  }

  type Subscription {
    boardRowUpdated(gameCode: String!): BoardRow!
    gameParticipantCreated(gameCode: String!): GameParticipant!
    gameStatusUpdated(gameCode: String!): Game!
    turnOrderUpdated(gameCode: String!): Game!
  }

  type Mutation {
    createGame: Game!
    createGameParticipant(
      gameCode: String!
      name: String!
      avatarUrl: String!
    ): GameParticipant
    updateBoardRow(
      gameCode: String!
      rowNumber: Int!
      activityDescription: String!
    ): BoardRow!
    updateGameDuration(code: String!, duration: Int): Game!
    updateGameStatus(code: String!, status: GameStatus): Game!
  }

  type BoardRow {
    id: ID!
    rowNumber: Int!
    activityDescription: String!
  }

  type Game {
    id: ID!
    code: String!
    status: GameStatus!
    duration: Int
    turnOrder: [Int!]
    boardRows: [BoardRow!]!
    gameParticipants: [GameParticipant!]!
  }

  type GameParticipant {
    id: ID!
    name: String!
    avatarUrl: String!
    breakawayCount: Int!
  }

  enum GameStatus {
    CREATED
    IN_PROGRESS
    COMPLETED
  }
`;
