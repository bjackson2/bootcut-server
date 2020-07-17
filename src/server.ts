import dotenv from 'dotenv';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import resolvers, {fieldResolver} from './resolvers';
import context from './context';
import http from 'http';

dotenv.config();

const port = process.env.SERVER_PORT;
const server = new ApolloServer({
  fieldResolver,
  typeDefs: schema,
  resolvers,
  context,
});
const app = express();
const corsOptions = {
  origin: ['http://192.168.1.31:3000', 'http://localhost:3000'],
};

app.use(compression());
app.use(cors(corsOptions));
server.applyMiddleware({app});

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, async () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`); // eslint-disable-line no-console
});
