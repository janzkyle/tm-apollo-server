import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import context from './context.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
