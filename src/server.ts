import dotenv from 'dotenv';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import resolvers, {fieldResolver} from './resolvers';

dotenv.config();

const port = process.env.SERVER_PORT;
const server = new ApolloServer({fieldResolver, typeDefs: schema, resolvers});
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
