import { useState } from 'react';
import RecordTable from '@/components/RecordTable';
import { useQuery } from '@apollo/client';
import { gql } from '@/types/gql';

import type { FC } from 'react';

const IndexPage: FC = () => {
  const [dnsInput, setDNSInput] = useState('');
  const [dnsZone, setDNSZone] = useState('');

  const query = gql(`
    query GetAllARecords($dns_zone: String!) {
      getARecords(dns_zone: $dns_zone) {
        id
        hostname
        value
      }
    }
  `);

  const { data, client } = useQuery(query, {
    variables: { dns_zone: dnsZone },
    fetchPolicy: 'network-only',
  });

  const refresh = () => {
    client.refetchQueries({ include: [query] });
  };

  return (
    <>
      <div className="index rounded-sm m-8 pb-1">
        <div>
          <label
            htmlFor="netlify_api_key"
            className="block mb-2 text-2xl text-gray-900 dark:text-white"
          >
            DNS Zone
          </label>
          <div className="flex">
            <input
              type="text"
              id="netlify_api_key"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="DNS Zone"
              required
              value={dnsInput}
              onChange={(e) => setDNSInput(e.target.value)}
            />
            <button className="inline" onClick={() => setDNSZone(dnsInput)}>
              ✅ Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="index rounded-sm m-8">
        <h1 className="text-2xl">A Records</h1>
        <hr className="mt-2 mb-2" />
        <RecordTable records={data?.getARecords || []} refresh={refresh} dns_zone={dnsZone} />
      </div>
    </>
  );
};

export default IndexPage;
