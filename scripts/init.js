const { Client } = require('pg');
require('dotenv').config();
const cron = require('node-cron');
const { request, gql } = require('graphql-request');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sqlQuery = async (query, variables) => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'ddns',
  });

  await client.connect();

  const res = await client.query(query, variables);

  await client.end();

  return res;
};

const initDatabase = async () => {
  await sqlQuery(`CREATE TABLE IF NOT EXISTS public_ip_records (
    record_id TEXT PRIMARY KEY,
    hostname TEXT NOT NULL,
    dns_zone TEXT NOT NUll
  );`);

  console.log('Initalized database ddns');
};

/**
 * delete all records not in record_ids
 *  */
const deletRecords = async (record_ids) => {
  // Construct the SQL query dynamically
  let query = 'DELETE FROM public_ip_records WHERE ';

  // Generate placeholders for the excluded IDs
  const placeholders = record_ids.map((_id, index) => '$' + (index + 1)).join(', ');

  query += `record_id NOT IN (${placeholders}) RETURNING *`;

  return await sqlQuery(query, record_ids);
};

const syncDatabseWithNetlify = async () => {
  console.log('Syncing local database with netlify');

  const query = gql`
    query GetAllARecords($dns_zone: String!) {
      getARecords(dns_zone: $dns_zone) {
        id
      }
    }
  `;

  const { getARecords } = await request('http://localhost:3000/api/graphql', query, {
    dns_zone: 'shawnhu_com',
  });

  const record_ids = getARecords.map(({ id }) => id);

  const { rows, rowCount } = await deletRecords(record_ids);

  if (rowCount >= 1) {
    rows.forEach(({ hostname }) => console.log(`Deleted A Record ${hostname} from local database`));
  } else {
    console.log('All Records are synced');
  }
};

const updatePublicIPRecords = async () => {
  console.log('Starting Public IP records update');

  const res = await sqlQuery('SELECT * FROM public_ip_records');

  if (res.rowCount == 0) {
    console.log('Did not find any records to update');
  } else {
    console.log(`Updating ${res.rowCount} records`);

    const updateMutation = gql`
      mutation UpdateRecord(
        $dns_zone: String!
        $host_name: String!
        $record_id: String!
        $value: String
      ) {
        updateARecord(
          dns_zone: $dns_zone
          host_name: $host_name
          record_id: $record_id
          value: $value
        ) {
          hostname
        }
      }
    `;

    const updatesPromises = res.rows.map(({ record_id, hostname, dns_zone }) =>
      request('http://localhost:3000/api/graphql', updateMutation, {
        host_name: hostname,
        record_id,
        dns_zone,
      }),
    );

    try {
      const updatedRows = await Promise.all(updatesPromises);

      updatedRows.forEach(({ updateARecord: { hostname } }) =>
        console.log(`Updated ${hostname} to newest public IP address`),
      );
    } catch (error) {
      console.error(error);
    }
  }
};

(async () => {
  await sleep(60000);

  try {
    await initDatabase();
  } catch (error) {
    console.error('Failed to initalize database');
    return console.error(error);
  }

  cron.schedule(process.env.CRON_INTERVAL, async () => {
    try {
      await syncDatabseWithNetlify();
    } catch (error) {
      console.error('Failed to sycn database with netlify');
      console.error(error);
    }

    try {
      await updatePublicIPRecords();
    } catch (error) {
      console('Failed to update records');
      console.error(error);
    }
  });
})();
