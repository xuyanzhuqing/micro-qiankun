import React from 'react';
import { Form, Input, Space } from 'antd';
import { FormItemIp } from '@dnt/components';

type FieldType = {
  ipv4?: string;
  ipv6?: string;
  gateway?: string;
}

const initialValues: FieldType = {
  ipv4: '1.1.1.1',
  ipv6: 'ffff::',
  gateway: '192.168.1.1',
}

export default () => {
  function onFinish() { }
  return (
    <Form
      name="ip-mask"
      onFinish={onFinish}
      initialValues={initialValues}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
    >
      <Space direction="vertical" style={{ display: 'flex' }}>
        <FormItemIp<FieldType> name="ipv4" label="IpV4" />
        <FormItemIp<FieldType> name="ipv6" label="IpV6" />
        <FormItemIp<FieldType> name="gateway" label="Gateway" inputProps={{ disabled: true }} />
      </Space>
    </Form>
  )
};