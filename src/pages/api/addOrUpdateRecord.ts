import type { NextApiRequest, NextApiResponse } from 'next';
import { getPublicIP } from '@/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { stdout } = await getPublicIP();

  const publicIP = stdout.trim(); // Remove leading/trailing whitespace

  console.log(`Your public IP address is: ${publicIP}`);

  res.json({ address: publicIP });
}
