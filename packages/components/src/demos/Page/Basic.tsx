import { Page } from '@dnt/components';
import { ns } from '@dnt/components/Page/locale';
import React from 'react';
import { useTranslation } from 'react-i18next';

const dataSource = [
  {
    key: '1',
    name: 'ann',
    age: 28,
    address: '欧罗巴国际花园',
  },
  {
    key: '2',
    name: 'michael',
    age: 31,
    address: '欧罗巴国际花园',
  },
];

export default () => {
  // 推荐
  const { t } = useTranslation();

  // 可以用，但是无 ts 类型提示
  const { t: nst } = useTranslation(ns);
  const columns = [
    {
      title: t('name', { ns }),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('age', { ns }),
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: nst('address'),
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return <Page dataSource={dataSource} columns={columns} />;
};
