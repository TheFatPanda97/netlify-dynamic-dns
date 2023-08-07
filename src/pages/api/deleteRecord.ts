import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { deleteRecord } from '@/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(400).send('please send a DELETE request');
  }

  const { record_id, netlify_api_key, dns_zone } = req.body;

  if (!netlify_api_key || !dns_zone || !record_id) {
    return res.status(400).send('missing record_id, netlify_api_key or dns_zone');
  }

  try {
    await deleteRecord(dns_zone, netlify_api_key, record_id);
    res.send('success!!');
  } catch (error) {
    console.error(error);
    res.status(500).send('error occured while fetching records');
  }
}
