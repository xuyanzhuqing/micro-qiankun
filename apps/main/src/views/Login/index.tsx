import { Button, Checkbox, Form, Input, Space, Select } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMenusAction } from "store/modules/login";
import { mockMenusApi } from 'mock/routes';
import cssStyle from './index.module.scss'
import { LanguageEnum, fallbackLng } from '@dnt/locale';
import { useTranslation } from 'react-i18next';
import { EventBusType, storeShared } from '_qiankun';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

const REMEMBER_ME = 'login.remember-me'
const USERNAME = 'login.username'
const PASSWORD = 'login.password'

interface LoginFormProps {
  remember: boolean;
  username: string;
  password: string;
}

const initialValues: LoginFormProps = {
  remember: localStorage.getItem(REMEMBER_ME) === String(true),
  username: localStorage.getItem(USERNAME) || '',
  password: localStorage.getItem(PASSWORD) || ''
}

const Login = () => {
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { t: tLogin } = useTranslation('login')
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: LoginFormProps) => {
    setLoading(true)
    const menus = await mockMenusApi()
    setLoading(false)
    dispatch(changeMenusAction(menus));
    // TODO: 登录功能
    /**
     * 考虑 token 续签
     * 1. 使用用户名密码登录
     * 2. 登录后拿到 token, 若需记住我，则保存 token 到本地，否则清空之前的 token
     * 3. 下次登录若需要记住我，界面回显用户名，加随机字符串，点击登录，则直接验证 token 是否过期，进行登录
     * 4. 若 token 验证失败或过期，则提示 token过期或失败，清空密码
     */
    if (values.remember) {
      localStorage.setItem(USERNAME, values.username)
      localStorage.setItem(PASSWORD, values.password)
    } else {
      localStorage.removeItem(USERNAME)
      localStorage.removeItem(PASSWORD)
    }
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string) => {
    storeShared.emit(EventBusType.SET_LANGUAGE, { lng: value })
  }

  const rememberMeHandler = (e: CheckboxChangeEvent) => {
    const bool = e.target.checked
    if (bool) {
      localStorage.setItem(REMEMBER_ME, e.target.checked.toString())
    } else {
      localStorage.removeItem(REMEMBER_ME)
    }
  }

  const defaultLanguage = localStorage.getItem('i18nextLng') || fallbackLng

  return (
    <>
      <Space direction="vertical" size="middle" align='center' className={cssStyle.login}>
        <Form<LoginFormProps>
          ref={formRef}
          name="basic"
          colon={false}
          wrapperCol={{ span: 24 }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          rootClassName={cssStyle["login-form"]}
        >
          <Space.Compact block rootClassName={[cssStyle["login-language"], cssStyle['login-item']].join(' ')}>
            <Select
              defaultValue={defaultLanguage}
              onChange={handleChange}
              className={cssStyle["login-language-select"]}
              options={LanguageEnum}
            />
          </Space.Compact>
          <Space.Compact block rootClassName={cssStyle["login-platform"]}>
            {t('platform', { ns: 'login' })}
          </Space.Compact>
          <Form.Item
            name={t('username')}
            className={cssStyle['login-item']}
            rules={[{ required: true, message: t('inputPlaceholder', { value: t('username') }) }]}
          >
            <Input placeholder={t("username")} />
          </Form.Item>

          <Form.Item
            name={t('password')}
            className={cssStyle['login-item']}
            rules={[{ required: true, message: t('inputPlaceholder', { value: t('password') }) }]}
          >
            <Input.Password placeholder={t('password')} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" className={cssStyle['login-item']}>
            <Checkbox onChange={rememberMeHandler}>{tLogin('rememberMe')}</Checkbox>
          </Form.Item>

          <Form.Item className={cssStyle['login-item']}>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {t('login')}
            </Button>
          </Form.Item>
        </Form>
      </Space>
      <p className={cssStyle["login-copyright"]}>
        copyright @2023 上海天玑科技股份有限公司出品
      </p>
    </>
  );
};

export default Login;