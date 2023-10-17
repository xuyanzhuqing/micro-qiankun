import { Button, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import locale, { ns } from './locale';

const Start = () => {
  const { t } = useTranslation();

  const onClick = (lng: string) => {
    locale.changeLanguage(lng);
  };

  return (
    <div>
      <Space>
        <Button type="primary" onClick={() => onClick('zh_CN')}>
          中文简体
        </Button>
        <Button type="primary" onClick={() => onClick('en_GB')}>
          英式英语
        </Button>
      </Space>
      <h2>{t('welcome', { ns })}</h2>
    </div>
  );
};

export default Start;
