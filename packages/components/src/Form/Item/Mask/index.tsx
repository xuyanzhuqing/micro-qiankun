import { Form, FormItemProps, Input, InputProps } from 'antd';
import React from 'react';
import { ipFormatRegex } from '@dnt/utils/lib/ip'
import { useTranslation } from 'react-i18next';
import { ns } from './locale';
import { Mask } from '@dnt/utils/lib/mask'

function FormItemMask<Values = any>(props: FormItemProps<Values> & { inputProps?: InputProps }) {
  const { inputProps, rules = [], ...itemProps } = props
  const { t } = useTranslation(ns);
  return (
    <Form.Item
      {...itemProps}
      rules={[
        {
          validator: (rule, value) => {
            if (value === '') {
              return Promise.resolve()
            }
            // 如果是纯数字则转化为数字比对，否则直接比对 ip 格式的 mask
            value = /^\d+$/.test(value) ? parseInt(value) : value
            if (Mask.isValid(value)) {
              return Promise.resolve()
            } else {
              return Promise.reject(new Error(t('tip')))
            }
          }
        },
        ...rules
      ]}
    >
      <Input {...inputProps} />
    </Form.Item>
  )
}

export default FormItemMask