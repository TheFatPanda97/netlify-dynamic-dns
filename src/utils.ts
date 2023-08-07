import util from 'node:util';
import axios from 'axios';
const exec = util.promisify(require('node:child_process').exec);
import type { Record } from './types/schema';

export const getPublicIP = async () => {
  const command = 'dig +short myip.opendns.com @resolver1.opendns.com';
  return exec(command);
};

export const getRecord = async (
  dns_zone: string | string[],
  netlify_api_key: string | string[],
  record_id: string | string[],
) => {
  const { data } = await axios.get<Record>(
    `https://api.netlify.com/api/v1/dns_zones/${dns_zone}/dns_records/${record_id}`,
    {
      headers: {
        Authorization: `Bearer ${netlify_api_key}`,
      },
    },
  );

  return data;
};

export const getAllARecords = async (
  dns_zone: string | string[],
  netlify_api_key: string | string[],
) => {
  const { data } = await axios.get<Record[]>(
    `https://api.netlify.com/api/v1/dns_zones/${dns_zone}/dns_records`,
    {
      headers: {
        Authorization: `Bearer ${netlify_api_key}`,
      },
    },
  );

  return data.filter((record) => record.type === 'A');
};

export const deleteRecord = (
  dns_zone: string | string[],
  netlify_api_key: string | string[],
  record_id: string | string[],
) =>
  axios.delete(`https://api.netlify.com/api/v1/dns_zones/${dns_zone}/dns_records/${record_id}`, {
    headers: {
      Authorization: `Bearer ${netlify_api_key}`,
    },
  });
