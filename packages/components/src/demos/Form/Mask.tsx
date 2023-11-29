import React from 'react';
import { Form, Space } from 'antd';
import { FormItemMask } from '@dnt/components';

type FieldType = {
  mask?: string;
  maskV6?: string
  cidr?: number;
}

const initialValues: FieldType = {
  mask: '255.255.255.0',
  maskV6: 'ffff:ffff:ffff:ffff::',
  cidr: 128
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
        <FormItemMask<FieldType> name="mask" label="Mask" />
        <FormItemMask<FieldType> name="maskV6" label="MaskV6" />
        <FormItemMask<FieldType> name="cidr" label="Cidr" />
      </Space>
    </Form>
  )
};