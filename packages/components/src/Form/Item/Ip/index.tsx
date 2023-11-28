import { Form, FormItemProps, Input, InputProps } from 'antd';
import React from 'react';
import { ipFormatRegex } from '@dnt/utils/lib/ip'
import { useTranslation } from 'react-i18next';
import { ns } from './locale';

function FormItemIp<Values = any>(props: FormItemProps<Values> & { inputProps?: InputProps }) {
  const { inputProps, rules = [], ...itemProps } = props
  const { t } = useTranslation(ns);
  return (
    <Form.Item
      {...itemProps}
      rules={[
        { pattern: ipFormatRegex, message: t('tip') },
        ...rules
      ]}
    >
      <Input {...inputProps} />
    </Form.Item>
  )
}

export default FormItemIp