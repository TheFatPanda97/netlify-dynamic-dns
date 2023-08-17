import { useState } from 'react';
import RecordTable from '@/components/RecordTable';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@/types/gql';
import Modal from 'react-modal';

import type { FC } from 'react';

const IndexPage: FC = () => {
  const [dnsInput, setDNSInput] = useState('');
  const [dnsZone, setDNSZone] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [hostname, setHostName] = useState('');
  const [value, setValue] = useState('');
  const [recordID, setRecordID] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPublicIP, setIsPublicIP] = useState(false);

  const query = gql(`
    query GetAllARecords($dns_zone: String!) {
      getARecords(dns_zone: $dns_zone) {
        id
        hostname
        value
        is_public_ip
      }
    }
  `);

  const addMutation = gql(`
    mutation AddRecord($dns_zone: String!, $host_name: String!, $value: String) {
      addARecord(dns_zone: $dns_zone, host_name: $host_name, value: $value) {
        id
        hostname
        value
        is_public_ip
      }
    }
  `);

  const updateMutation = gql(`
    mutation UpdateRecord($dns_zone: String!, $host_name: String!, $record_id: String!, $value: String) {
      updateARecord(dns_zone: $dns_zone, host_name: $host_name, record_id: $record_id, value: $value) {
        id
        hostname
        value
        is_public_ip
      }
    }
  `);

  const [addFn] = useMutation(addMutation, {
    fetchPolicy: 'network-only',
  });

  const [updateFn] = useMutation(updateMutation, {
    fetchPolicy: 'network-only',
  });

  const { data, client } = useQuery(query, {
    variables: { dns_zone: dnsZone },
    fetchPolicy: 'network-only',
  });

  const refresh = () => {
    client.refetchQueries({ include: [query] });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setHostName('');
    setValue('');
    setRecordID('');
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgb(255, 255, 255, 0.25)',
          },
          content: {
            backgroundColor: '#12181F',
            borderRadius: '5px',
            borderColor: 'transparent',
            padding: 0,
          },
        }}
      >
        <form className="px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="hostname">
              Hostname
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
              id="hostname"
              type="text"
              placeholder="eg. test will create test.example.com (where example.com is your domain)"
              value={hostname}
              onChange={(e) => setHostName(e.target.value)}
            />
          </div>
          <div className="mt-5 mb-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isPublicIP}
                className="sr-only peer"
                onChange={() => setIsPublicIP(!isPublicIP)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Set Value as Public IP Address
              </span>
            </label>
          </div>
          {!isPublicIP && (
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2" htmlFor="value">
                Value
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                id="value"
                type="text"
                placeholder="eg. 192.168.4.23"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          )}
          <div className="flex items-center justify-start">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5"
              type="button"
              onClick={async () => {
                if (hostname === '') {
                  return alert('Please enter a hostname');
                }

                if (!isPublicIP && value === '') {
                  return alert('Please enter a value');
                }

                setLoading(true);
                closeModal();

                try {
                  if (recordID) {
                    const res = await updateFn({
                      variables: {
                        dns_zone: dnsZone,
                        host_name: hostname,
                        record_id: recordID,
                        value: !isPublicIP ? value : '',
                      },
                    });
                    alert(`A Record ${res.data?.updateARecord.hostname} has been updated`);
                  } else {
                    const res = await addFn({
                      variables: {
                        dns_zone: dnsZone,
                        host_name: hostname,
                        value: !isPublicIP ? value : '',
                      },
                    });
                    alert(`A Record ${res.data?.addARecord.hostname} has been added`);
                  }

                  refresh();
                } catch (error) {
                  alert('Something went wrong');
                }

                setLoading(false);
              }}
            >
              {recordID === '' ? 'Add Record' : 'Update Record'}
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <div className="index rounded-sm m-8 pb-1">
        <div>
          <label
            htmlFor="dns_zone"
            className="block mb-2 text-2xl text-gray-900 dark:text-white"
          >
            DNS Zone
          </label>
          <div className="flex">
            <input
              type="text"
              id="dns_zone"
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
        <RecordTable
          records={data?.getARecords || []}
          refresh={refresh}
          dns_zone={dnsZone}
          openModal={openModal}
          loading={loading}
          setLoading={setLoading}
          setModalHostName={setHostName}
          setModalValue={setValue}
          setRecordID={setRecordID}
          setIsPublicIP={setIsPublicIP}
        />
      </div>
    </>
  );
};

export default IndexPage;
