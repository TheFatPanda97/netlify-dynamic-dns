import RecordTable from '@/components/RecordTable';

import type { FC } from 'react';

const IndexPage: FC = () => {
  return (
    <>
      <div className="index rounded-sm m-8 pb-1">
        <div>
          <label
            htmlFor="netlify_api_key"
            className="block mb-2 text-2xl text-gray-900 dark:text-white"
          >
            Netlify API Key
          </label>
          <input
            type="text"
            id="netlify_api_key"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Netlify API Key"
            required
          />
        </div>
      </div>
      <div className="index rounded-sm m-8">
        <h1 className="text-2xl">A Records</h1>
        <hr className="mt-2 mb-4" />
        <RecordTable />
      </div>
    </>
  );
};

export default IndexPage;
