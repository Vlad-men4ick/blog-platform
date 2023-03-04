/* eslint-disable dot-notation */
import spiner from './spiner.module.scss';
import { Space, Spin } from 'antd';

function Spinner() {
  return (
    <div className={spiner.exempel}>
      <Space size="middle">
        <Spin tip="Loading tickets" size="large" />
      </Space>
    </div>
  );
}
export default Spinner;
