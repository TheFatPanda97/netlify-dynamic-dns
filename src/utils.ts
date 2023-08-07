import util from 'node:util';
import axios from 'axios';
const exec = util.promisify(require('node:child_process').exec);

export interface IRecord {
  hostname: string;
  type: string;
  ttl: number;
  priority: string | null;
  weight: string | null;
  port: string | null;
  flag: string | null;
  tag: string | null;
  id: string;
  site_id: string | null;
  dns_zone_id: string;
  errors: string[];
  managed: boolean;
  value: string;
}

export const getPublicIP = async () => {
  const command = 'dig +short myip.opendns.com @resolver1.opendns.com';
  return exec(command);
};

export const getAllARecords = async (
  dns_zone: string | string[],
  netlify_api_key: string | string[],
) => {
  const { data } = await axios.get<IRecord[]>(
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
