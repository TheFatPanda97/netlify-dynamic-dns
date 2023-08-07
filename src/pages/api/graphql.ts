import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import typeDefs from '@/graphql/schema.graphql';

import { getAllARecords, deleteRecord, getRecord } from '@/utils';
import type { QueryGetARecordsArgs, MutationDeleteARecordArgs } from '@/types/schema';

const resolvers = {
  Query: {
    getARecords: (
      _root: any,
      { dns_zone }: QueryGetARecordsArgs,
      { netlify_api_key }: { netlify_api_key: string },
    ) => getAllARecords(dns_zone, netlify_api_key),
  },
  Mutation: {
    deleteARecord: async (
      _root: any,
      { dns_zone, record_id }: MutationDeleteARecordArgs,
      { netlify_api_key }: { netlify_api_key: string },
    ) => {
      const oldRecord = await getRecord(dns_zone, netlify_api_key, record_id);
      await deleteRecord(dns_zone, netlify_api_key, record_id);
      return oldRecord;
    },
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({
    req,
    res,
    netlify_api_key: (req.headers.netlify_api_key as string) || '',
  }),
});
