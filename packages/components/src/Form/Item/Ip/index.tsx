import { Form, FormItemProps, Input, InputProps } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ns } from './locale';
import { IpVersionContext } from '../IpVersionContext'
import { ipFormatRegex, v4FormatRegex, v6FormatRegex, IpFormatEnum } from '@dnt/utils/lib/ip'

const IpRegexRecord: Record<IpFormatEnum, RegExp> = {
  [IpFormatEnum.mix]: ipFormatRegex,
  [IpFormatEnum.IPv4]: v4FormatRegex,
  [IpFormatEnum.IPv6]: v6FormatRegex,
}

function FormItemIp<Values = any>(props: FormItemProps<Values> & { inputProps?: InputProps }) {
  const { inputProps, rules = [], ...itemProps } = props
  const { t } = useTranslation(ns);
  const ipVersion = useContext(IpVersionContext);
  return (
    <Form.Item
      {...itemProps}
      rules={[
        { pattern: IpRegexRecord[ipVersion], message: t('tip') },
        ...rules
      ]}
    >
      <Input {...inputProps} />
    </Form.Item>
  )
}

export default FormItemIp