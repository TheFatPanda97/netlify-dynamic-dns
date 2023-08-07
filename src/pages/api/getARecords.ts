import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface IRecord {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { netlify_api_key, dns_zone } = req.query;

  if (!netlify_api_key || !dns_zone) {
    return res.status(400).send("missing netlify_api_key or dns_zone");
  }

  try {
    const { data } = await axios.get<IRecord[]>(
      `https://api.netlify.com/api/v1/dns_zones/${dns_zone}/dns_records`,
      {
        headers: {
          Authorization: `Bearer ${netlify_api_key}`,
        },
      },
    );

    console.log(data);

    res.send('nice');
  } catch (error) {
    console.error(error);
    res.status(500).send("error occured while fetching records")
  }
}
