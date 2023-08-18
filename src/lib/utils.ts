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

/**
 *
 * @param netlifyRecords list of records to append information to
 * @param sqlRecords sqlrecords to append info for
 * @returns records with is_public_ip and created_at
 */
export const appendSQLInfo = (
  netlifyRecords: OmittedNetlifyRecord[],
  sqlRecords: ITableSchema[],
) => {
  const parsedSqlRecords = sqlRecords.reduce<{
    [record_id: string]: {
      hostname: string;
      dns_zone: string;
      created_at: string;
    };
  }>(
    (acc, { record_id, hostname, dns_zone, created_at }) => ({
      ...acc,
      [record_id]: {
        hostname,
        dns_zone,
        created_at: created_at.toISOString(),
      },
    }),
    {},
  );

  return netlifyRecords.map((record) => ({
    ...record,
    is_public_ip: record.id in parsedSqlRecords,
    created_at: parsedSqlRecords[record.id]?.created_at || '',
  }));
};

export const parseISOString = (isoString?: string | null) => {
  if (!isoString) {
    return null;
  }

  const isoRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{3}))?Z$/;
  const match = isoString.match(isoRegex);

  if (!match) {
    return null; // Invalid ISO string format
  }

  const [, year, month, day, hours, minutes, seconds, milliseconds] = match.map(Number);

  const parsedDate = new Date();
  parsedDate.setUTCFullYear(year);
  parsedDate.setUTCMonth(month - 1); // Months in Date are 0-indexed
  parsedDate.setUTCDate(day);
  parsedDate.setUTCHours(hours);
  parsedDate.setUTCMinutes(minutes);
  parsedDate.setUTCSeconds(seconds);
  parsedDate.setUTCMilliseconds(milliseconds || 0);

  return parsedDate;
};
