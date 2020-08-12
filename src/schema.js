import { makeExecutableSchema } from 'graphql-tools';
import { typeDefs as scalarTypeDefs, resolvers as scalarResolvers } from 'graphql-scalars';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import IsAuthenticated, { typeDefs as isAuthenticatedType } from '../directives/isAuthenticated';

// const typeDefsArr = [isAuthenticatedType, typeDefs, scalarTypeDefs];

// const resolversArr = [resolvers, scalarResolvers];

export default makeExecutableSchema({
  typeDefs: [isAuthenticatedType, typeDefs, ...scalarTypeDefs],
  resolvers: [resolvers, scalarResolvers],
  schemaDirectives: {
    isAuthenticated: IsAuthenticated,
  },
});
