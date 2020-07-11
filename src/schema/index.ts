import {gql} from 'apollo-server-express';

export default gql`
  type Query {
    boardRows: [BoardRow!]
  }

  type Mutation {
    updateBoardRow(rowNumber: Int!, activityDescription: String!): BoardRow
  }

  type BoardRow {
    id: ID!
    rowNumber: Int!
    activityDescription: String!
  }
`;
