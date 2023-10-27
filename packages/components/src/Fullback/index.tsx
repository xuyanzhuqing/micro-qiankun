import React from 'react';
import { Spin, Space } from 'antd';

const Fullback: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>
  </Space>
);

export default Fullback;