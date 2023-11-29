import React, { useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import { FormItemIp, FormItemMask, IpVersionContext } from '@dnt/components';
import { getIpVersion, IpFormatEnum } from '@dnt/utils/lib/ip'
import { debounce } from 'lodash-es'

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
  const [ipVersion, setIpVersion] = useState(IpFormatEnum.mix)
  function onFinish() { }
  return (
    <IpVersionContext.Provider value={ipVersion}>
      <Form
        name="ip-mask2"
        onFinish={onFinish}
        initialValues={initialValues}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
      >
        <Space direction="vertical" style={{ display: 'flex' }}>
          <FormItemIp<FieldType> name="ip" label="Ip" inputProps={{
            onChange: debounce((e) => {
              const version = getIpVersion(e.target.value)
              setIpVersion(version)
            }, 100)
          }} />
          <FormItemIp<FieldType> name="gateway" label="Gateway" />
        </Space>
        <Space direction="vertical" style={{ display: 'flex' }}>
          <FormItemMask<FieldType> name="mask" label="Mask" />
          <FormItemMask<FieldType> name="cidr" label="Cidr" />
        </Space>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </IpVersionContext.Provider>
  )
};