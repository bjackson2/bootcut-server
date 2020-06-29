import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import compression from 'compression';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World',
  },
};

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
app.use(compression());
server.applyMiddleware({app});

app.listen({port: 3000}, () =>
  console.log(`Server ready at http://localhost:3000${server.graphqlPath}`)
);
