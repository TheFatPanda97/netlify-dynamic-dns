import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { getAllARecords } from '@/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { netlify_api_key, dns_zone } = req.query;

  if (!netlify_api_key || !dns_zone) {
    return res.status(400).send('missing netlify_api_key or dns_zone');
  }

  try {
    const allARecords = await getAllARecords(dns_zone, netlify_api_key);
    res.json(allARecords);
  } catch (error) {
    console.error(error);
    res.status(500).send('error occured while fetching records');
  }
}
