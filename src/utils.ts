import util from 'node:util';
import axios from 'axios';
const exec = util.promisify(require('node:child_process').exec);
import type { Record, MutationAddARecordArgs } from './types/schema';

export const getPublicIP = async () => {
  const command = 'dig +short myip.opendns.com @resolver1.opendns.com';
  return exec(command);
};

export const getSubDomain = (str: string) => {
  const regex = /(?:https?:\/\/)?((?:\w+\.)+(?=\w+\.\w+))/gm;

  let m;
  const allMatches: string[] = [];

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match) => {
      allMatches.push(match);
    });
  }

  return allMatches[0]?.substring(0, allMatches[0].length - 1) || '';
};

export const addARecord = async (
  dns_zone: string,
  netlify_api_key: string,
  host_name: string,
  value?: MutationAddARecordArgs['value'],
) => {
  let publicIP = null;

  if (!value) {
    const { stdout } = await getPublicIP();
    publicIP = stdout.trim();
  }

  const { data } = await axios.post<Record>(
    `https://api.netlify.com/api/v1/dns_zones/${dns_zone}/dns_records`,
    {
      type: 'A',
      hostname: host_name,
      value: value || publicIP,
    },
    {
      headers: {
        Authorization: `Bearer ${netlify_api_key}`,
      },
    },
  );

  return data;
};

export const getRecord = async (dns_zone: string, netlify_api_key: string, record_id: string) => {
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

export const getAllARecords = async (dns_zone: string, netlify_api_key: string) => {
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

export const deleteRecord = (dns_zone: string, netlify_api_key: string, record_id: string) =>
  axios.delete(`https://api.netlify.com/api/v1/dns_zones/${dns_zone}/dns_records/${record_id}`, {
    headers: {
      Authorization: `Bearer ${netlify_api_key}`,
    },
  });
