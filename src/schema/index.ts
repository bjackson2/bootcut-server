import {gql} from 'apollo-server-express';

export default gql`
  type Query {
    game(code: String!): Game!
    games: [Game!]!
  }

  type Subscription {
    boardRowUpdated(gameCode: String!): BoardRow!
  }

  type Mutation {
    updateBoardRow(
      gameCode: String!
      rowNumber: Int!
      activityDescription: String!
    ): BoardRow!
    createGame: Game!
    createGameParticipant(
      gameCode: String!
      name: String!
      avatarUrl: String!
    ): GameParticipant
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
