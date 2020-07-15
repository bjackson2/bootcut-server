import {gql} from 'apollo-server-express';

export default gql`
  type Query {
    game(id: String!): Game!
  }

  type Mutation {
    updateBoardRow(rowNumber: Int!, activityDescription: String!): BoardRow!
    createGame(name: String): Game!
  }

  type BoardRow {
    id: ID!
    rowNumber: Int!
    activityDescription: String!
  }

  type Game {
    id: ID!
    name: String
    shortCode: String!
    boardRows: [BoardRow!]!
  }
`;
