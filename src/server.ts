import dotenv from 'dotenv';
import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import compression from 'compression';
import {query} from './db';

dotenv.config();

const port = process.env.SERVER_PORT;
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

app.listen({port}, async () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  const foo = await query('SELECT NOW()');
  console.log(foo);
});
