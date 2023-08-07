import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getPublicIP } from '@/utils';
import { getAllARecords, deleteRecord } from '@/utils';
import type { IRecord } from '@/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(400).send('please send a POST request');
  }

  const { netlify_api_key, dns_zone, host_name, value, domain } = req.body;

  if (!netlify_api_key || !dns_zone || !host_name || !domain) {
    return res.status(400).send('missing netlify_api_key, dns_zone, host_name or domain');
  }

  try {
    const { stdout } = await getPublicIP();
    const publicIP = stdout.trim();
    const allARecords = await getAllARecords(dns_zone, netlify_api_key);
    const serviceRecord = allARecords.find(
      (record) => record.hostname === `${host_name}.${domain}`,
    );

    // there is already a A record, delete it
    if (serviceRecord) {
      await deleteRecord(dns_zone, netlify_api_key, serviceRecord.id);
    }

    // add a new A record
    const newRecord = await axios.post<IRecord>(
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

    res.json({
      id: newRecord.data.id,
      type: 'A',
      hostname: host_name,
      value: value || publicIP,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('error occured while adding or updating record');
  }
}
