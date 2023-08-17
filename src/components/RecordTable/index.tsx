import classNames from 'classnames';
import { useMutation } from '@apollo/client';
import { gql } from '@/types/gql';

import { getSubDomain } from '@/lib/utils';
import styles from './styles.module.scss';
import type { FC } from 'react';

interface IProps {
  records: {
    id: string;
    hostname: string;
    value: string;
    is_public_ip: boolean;
  }[];
  refresh: () => void;
  dns_zone: string;
  openModal: () => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  setModalHostName: (val: string) => void;
  setModalValue: (val: string) => void;
  setRecordID: (val: string) => void;
  setIsPublicIP: (val: boolean) => void;
}

const RecordTable: FC<IProps> = ({
  records,
  refresh,
  dns_zone,
  openModal,
  loading,
  setLoading,
  setModalHostName,
  setModalValue,
  setRecordID,
  setIsPublicIP,
}) => {
  const deleteMutation = gql(`
    mutation DeleteRecord($dns_zone: String!, $record_id: String!) {
      deleteRecord(dns_zone: $dns_zone, record_id: $record_id) {
          hostname
      }
    }
  `);

  const [deleteFn] = useMutation(deleteMutation, {
    fetchPolicy: 'network-only',
  });

  return (
    <div>
      <table className={classNames('table-auto w-full rounded-sm', styles['record-table'])}>
        <tbody>
          {records.map(({ id, hostname, value, is_public_ip }) => (
            <tr key={id}>
              <td>{hostname}</td>
              <td>{value + (is_public_ip ? ' (public ip)' : '')}</td>
              <td>
                <button
                  className={classNames({ 'text-slate-500': loading })}
                  disabled={loading}
                  onClick={() => {
                    setModalHostName(getSubDomain(hostname));
                    setModalValue(value);
                    setRecordID(id);
                    setIsPublicIP(is_public_ip);
                    openModal();
                  }}
                >
                  ✏️ Edit
                </button>
              </td>
              <td>
                <button
                  className={classNames({ 'text-slate-500': loading })}
                  disabled={loading}
                  onClick={async () => {
                    const yes = confirm('Do you want to delete this record?');

                    if (yes) {
                      setLoading(true);

                      const res = await deleteFn({
                        variables: {
                          dns_zone,
                          record_id: id,
                        },
                      });

                      alert(`A Record ${res.data?.deleteRecord.hostname} has been deleted`);

                      refresh();
                      setLoading(false);
                    }
                  }}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
          {records.length > 0 && (
            <tr>
              <td>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
                  type="button"
                  onClick={openModal}
                >
                  Add Record
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
