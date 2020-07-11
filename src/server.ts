import dotenv from 'dotenv';
import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
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
    hello: async () => {
      const res = await query('SELECT NOW()');
      return res.rows[0].now;
    },
  },
};

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(compression());
app.use(cors(corsOptions));
server.applyMiddleware({app});

app.listen({port}, async () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
