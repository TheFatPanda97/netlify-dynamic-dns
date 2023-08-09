import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
/// <reference path="./graphql.d.ts" />
import typeDefs from '@/graphql/schema.graphql';

import { getAllARecords, deleteRecord, getRecord, addARecord } from '@/utils';
import type { Resolvers } from '@/types/schema';

const resolvers: Resolvers<{ netlify_api_key: string }> = {
  Query: {
    getARecords: (_root: any, { dns_zone }, { netlify_api_key }) =>
      getAllARecords(dns_zone, netlify_api_key),
  },
  Mutation: {
    addOrUpdateARecord: async (
      _root: any,
      { dns_zone, host_name, value, record_id },
      { netlify_api_key },
    ) => {
      if (record_id) {
        await deleteRecord(dns_zone, netlify_api_key, record_id);
      }

      console.log(`Log: add record ${host_name} with value ${value}`);

      return await addARecord(dns_zone, netlify_api_key, host_name, value);
    },
    deleteRecord: async (_root: any, { dns_zone, record_id }, { netlify_api_key }) => {
      const oldRecord = await getRecord(dns_zone, netlify_api_key, record_id);
      await deleteRecord(dns_zone, netlify_api_key, record_id);

      console.log(`Log: deleted record ${oldRecord.hostname} with value ${oldRecord.value}`);

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
    netlify_api_key: process.env.NETLIFY_API_KEY || '',
  }),
});
