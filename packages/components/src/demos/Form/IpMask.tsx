import React from 'react';
import { Form, Input, Space } from 'antd';
import { FormItemIp, FormItemMask } from '@dnt/components';

type FieldType = {
  ipv4?: string;
  ipv6?: string;
  gateway?: string;
  mask?: string;
  maskV6?: string
  cidr?: number;
}

const initialValues: FieldType = {
  ipv4: '1.1.1.1',
  ipv6: 'ffff::',
  gateway: '192.168.1.1',
  mask: '255.255.255.0',
  maskV6: 'ffff:ffff:ffff:ffff::',
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
        <FormItemIp<FieldType> name="ipv4" label="IpV4" />
        <FormItemIp<FieldType> name="ipv6" label="IpV6" />
        <FormItemIp<FieldType> name="gateway" label="Gateway" inputProps={{ disabled: true }} />
      </Space>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <FormItemMask<FieldType> name="mask" label="Mask" />
        <FormItemMask<FieldType> name="maskV6" label="MaskV6" />
        <FormItemMask<FieldType> name="cidr" label="Cidr" />
      </Space>
    </Form>
  )
};