import classNames from 'classnames';

import styles from './styles.module.scss';
import type { FC } from 'react';

const RecordTable: FC = () => {
  return (
    <div>
      <table className={classNames('table-auto w-full rounded-sm', styles['record-table'])}>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
