import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
/// <reference path="./graphql.d.ts" />
import typeDefs from '@/graphql/schema.graphql';

import { getAllARecords, deleteRecord, getRecord, addARecord, getPublicIP } from '@/lib/requests';
import { getSubDomain, appendSQLInfo } from '@/lib/utils';
import * as sql from '@/lib/DAO';
import type { Resolvers } from '@/types/schema';

const resolvers: Resolvers<{ netlify_api_key: string }> = {
  Query: {
    getARecords: async (_root: any, { dns_zone }, { netlify_api_key }) => {
      const netlifyRecords = await getAllARecords(dns_zone, netlify_api_key);
      const sqlRecords = (await sql.getAllRecords(dns_zone)).rows;

      console.log('LOG: fetched all A records');

      return appendSQLInfo(netlifyRecords, sqlRecords);
    },
  },
  Mutation: {
    addARecord: async (_root: any, { dns_zone, host_name, value }, { netlify_api_key }) => {
      const record = await addARecord(dns_zone, netlify_api_key, host_name, value);
      let created_at: Date | null = null;

      // public ip
      if (!value) {
        const sqlRes = await sql.addRecord(record.id, record.hostname, dns_zone);
        created_at = sqlRes.rows[0].created_at;
      }

      console.log(`LOG: added record <${record.hostname}, ${record.value}>`);

      return { ...record, is_public_ip: !value, created_at: created_at?.toISOString() };
    },
    updateARecord: async (
      _root: any,
      { dns_zone, host_name, value, record_id },
      { netlify_api_key },
    ) => {
      const oldRecord = await getRecord(dns_zone, netlify_api_key, record_id);
      const oldSubDomain = getSubDomain(oldRecord.hostname);
      const oldSqlRecord: sql.ITableSchema | undefined = (await sql.getRecord(record_id)).rows[0];
      const newPublicIP = await getPublicIP();
      const newValue = value || newPublicIP;

      // delete the old record only if either the hostname or value has changed
      if (
        host_name !== oldSubDomain ||
        newValue !== oldRecord.value ||
        (value && oldSqlRecord) || // if toggleing from public ip to custom value
        (!value && !oldSqlRecord) // if toggleing from custom value to public ip
      ) {
        let created_at: Date | null = null;

        await deleteRecord(dns_zone, netlify_api_key, record_id);
        const newRecord = await addARecord(dns_zone, netlify_api_key, host_name, value);

        // there's a old public ip address record for this one
        if (oldSqlRecord) {
          await sql.deleteRecord(record_id);
        }

        // public ip
        if (!value) {
          const newSqlRecord = await sql.addRecord(newRecord.id, newRecord.hostname, dns_zone);
          created_at = newSqlRecord.rows[0].created_at;
        }

        if (host_name !== oldSubDomain || newValue !== oldRecord.value) {
          console.log(
            `LOG: updated record from <${oldRecord.hostname}, ${oldRecord.value}> to <${newRecord.hostname}, ${newRecord.value}>`,
          );
        } else if (value && oldSqlRecord) {
          console.log(
            `LOG: updated record from public ip address <${oldRecord.hostname}, ${oldRecord.value}> to <${newRecord.hostname}, ${newRecord.value}>`,
          );
        } else {
          console.log(
            `LOG: updated record from <${oldRecord.hostname}, ${oldRecord.value}> to public ip address <${newRecord.hostname}, ${newRecord.value}>`,
          );
        }

        return { ...newRecord, is_public_ip: !value, created_at: created_at?.toISOString() };
      } else {
        console.log(
          `LOG: updated record did not execute because request has the same hostname and value as old record: <${oldRecord.hostname}, ${oldRecord.value}>`,
        );
        return {
          ...oldRecord,
          is_public_ip: !value,
          created_at: oldSqlRecord?.created_at.toISOString(),
        };
      }
    },
    deleteRecord: async (_root: any, { dns_zone, record_id }, { netlify_api_key }) => {
      const oldRecord = await getRecord(dns_zone, netlify_api_key, record_id);
      await deleteRecord(dns_zone, netlify_api_key, record_id);
      const res = await sql.deleteRecord(record_id);

      console.log(`LOG: deleted record <${oldRecord.hostname}, ${oldRecord.value}>`);

      return {
        ...oldRecord,
        is_public_ip: res.rowCount >= 1,
        created_at: res.rows[0]?.created_at.toISOString(),
      };
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
