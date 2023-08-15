import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
/// <reference path="./graphql.d.ts" />
import typeDefs from '@/graphql/schema.graphql';

import { getAllARecords, deleteRecord, getRecord, addARecord } from '@/lib/requests';
import { getSubDomain } from '@/lib/utils';
import type { Resolvers } from '@/types/schema';

const resolvers: Resolvers<{ netlify_api_key: string }> = {
  Query: {
    getARecords: (_root: any, { dns_zone }, { netlify_api_key }) =>
      getAllARecords(dns_zone, netlify_api_key),
  },
  Mutation: {
    addARecord: async (_root: any, { dns_zone, host_name, value }, { netlify_api_key }) => {
      const record = await addARecord(dns_zone, netlify_api_key, host_name, value);

      console.log(`LOG: added record <${record.hostname}, ${record.value}>`);

      return record;
    },
    updateARecord: async (
      _root: any,
      { dns_zone, host_name, value, record_id },
      { netlify_api_key },
    ) => {
      const oldRecord = await getRecord(dns_zone, netlify_api_key, record_id);
      const oldSubDomain = getSubDomain(oldRecord.hostname);

      // delete the old record only if either the hostname or value has changed
      if (host_name !== oldSubDomain || value !== oldRecord.value) {
        await deleteRecord(dns_zone, netlify_api_key, record_id);

        const newRecord = await addARecord(dns_zone, netlify_api_key, host_name, value);

        console.log(
          `LOG: updated record from <${oldRecord.hostname}, ${oldRecord.value}> to <${newRecord.hostname}, ${newRecord.value}>`,
        );

        return newRecord;
      } else {
        console.log(
          `LOG: updated record did not execute because request has the same hostname and value as old record: <${oldRecord.hostname}, ${oldRecord.value}>`,
        );
        return oldRecord;
      }
    },
    deleteRecord: async (_root: any, { dns_zone, record_id }, { netlify_api_key }) => {
      const oldRecord = await getRecord(dns_zone, netlify_api_key, record_id);
      await deleteRecord(dns_zone, netlify_api_key, record_id);

      console.log(`LOG: deleted record <${oldRecord.hostname}, ${oldRecord.value}>`);

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
