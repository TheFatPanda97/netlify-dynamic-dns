import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from '@/graphql/schema.graphql';

import { getAllARecords } from '@/utils';
import type { QueryARecordsArgs } from '@/types/schema';

const resolvers = {
  Query: {
    ARecords: (_root: any, { dns_zone, netlify_api_key }: QueryARecordsArgs) =>
      getAllARecords(dns_zone, netlify_api_key),
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
