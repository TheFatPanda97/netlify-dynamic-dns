import { Client } from 'pg';

export interface ITableSchema {
  record_id: string;
  hostname: string;
  dns_zone: string;
}

export const getAllRecords = async (dns_zone: string) => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'ddns',
  });

  await client.connect();

  const result = await client.query<ITableSchema>(
    'SELECT * FROM public_ip_records WHERE dns_zone = $1',
    [dns_zone],
  );

  await client.end();

  return result;
};

export const getRecord = async (record_id: string) => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'ddns',
  });

  await client.connect();

  const result = await client.query<ITableSchema>(
    'SELECT * FROM public_ip_records WHERE record_id = $1',
    [record_id],
  );

  await client.end();

  return result;
};

export const addRecord = async (record_id: string, hostname: string, dns_zone: string) => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'ddns',
  });

  await client.connect();

  const result = await client.query<ITableSchema>(
    'INSERT INTO public_ip_records VALUES ($1, $2, $3) RETURNING *',
    [record_id, hostname, dns_zone],
  );

  await client.end();

  return result;
};

export const deleteRecord = async (record_id: string) => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'ddns',
  });

  await client.connect();

  const result = await client.query<ITableSchema>(
    'DELETE FROM public_ip_records WHERE record_id = $1 RETURNING *',
    [record_id],
  );

  await client.end();

  return result;
};
