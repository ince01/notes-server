/* eslint-disable no-param-reassign */
import { gql, SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

export const typeDefs = gql`
  directive @isAuthenticated on FIELD_DEFINITION
`;

export default class IsAuthenticated extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      const context = args[2];
      const { user } = context;

      if (!user) {
        throw new AuthenticationError('unauthenticaed', { code: 'UNAUTHENTICATED' });
      }

      const result = await resolve.apply(this, args);

      return result;
    };
  }
}
