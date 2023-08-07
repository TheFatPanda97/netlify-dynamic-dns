import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { record_id, netlify_api_key, dns_zone } = req.query;

  if (!netlify_api_key || !dns_zone || !record_id) {
    return res.status(400).send('missing record_id, netlify_api_key or dns_zone');
  }

  try {
    await axios.delete(
      `https://api.netlify.com/api/v1/dns_zones/${dns_zone}/dns_records/${record_id}`,
      {
        headers: {
          Authorization: `Bearer ${netlify_api_key}`,
        },
      },
    );
    res.send('success!!');
  } catch (error) {
    console.error(error);
    res.status(500).send('error occured while fetching records');
  }
}
