import React from 'react';
import { Form, Input, Space } from 'antd';
import { FormItemIp, FormItemMask } from '@dnt/components';

type FieldType = {
  ip?: string;
  gateway?: string;
  mask?: string;
  cidr?: number;
}

const initialValues: FieldType = {
  ip: '1.1.1.1',
  gateway: '192.168.1.1',
  mask: '255.255.255.0',
  cidr: 128
}

export default () => {
  function onFinish() { }
  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      initialValues={initialValues}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
    >
      <Space direction="vertical" style={{ display: 'flex' }}>
        <FormItemIp<FieldType> name="ip" label="Ip" />
        <FormItemIp<FieldType> name="gateway" label="Gateway" inputProps={{ disabled: true }} />
      </Space>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <FormItemMask<FieldType> name="mask" label="Mask" />
        <FormItemMask<FieldType> name="cidr" label="Cidr" />
      </Space>
    </Form>
  )
};