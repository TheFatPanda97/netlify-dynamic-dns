import type { ITableSchema } from '@/lib/DAO';
import type { OmittedNetlifyRecord } from './requests';

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

export const appendIsPublicIP = (
  netlifyRecords: OmittedNetlifyRecord[],
  sqlRecords: ITableSchema[],
) => {
  const parsedSqlRecords = sqlRecords.reduce(
    (acc, { record_id, hostname, dns_zone: dnszone }) => ({
      ...acc,
      [record_id]: {
        hostname,
        dns_zone: dnszone,
      },
    }),
    {},
  );

  return netlifyRecords.map((record) => ({
    ...record,
    is_public_ip: record.id in parsedSqlRecords,
  }));
};
