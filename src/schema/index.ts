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
  }

  enum GameStatus {
    CREATED
    IN_PROGRESS
    COMPLETED
  }
`;
