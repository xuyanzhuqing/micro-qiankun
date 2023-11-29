import { Form, FormItemProps, Input, InputProps } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ns } from './locale';
import { Mask } from '@dnt/utils/lib/mask'
import { IpFormatEnum } from '@dnt/utils/lib/ip'
import { IpVersionContext } from '../IpVersionContext'

const MaskValidRecord: Record<IpFormatEnum, typeof Mask.isValid> = {
  [IpFormatEnum.mix]: Mask.isValid,
  [IpFormatEnum.IPv4]: Mask.isValidV4,
  [IpFormatEnum.IPv6]: Mask.isValidV6,
}

function FormItemMask<Values = any>(props: FormItemProps<Values> & { inputProps?: InputProps }) {
  const { inputProps, rules = [], ...itemProps } = props
  const { t } = useTranslation(ns);
  const ipVersion = useContext(IpVersionContext);
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
            if (MaskValidRecord[ipVersion](value)) {
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