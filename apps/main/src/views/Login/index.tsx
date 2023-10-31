import { Button, Checkbox, Form, Input, Space, Card } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMenusAction } from "store/modules/login";
import { mockMenusApi } from 'mock/routes';
import cssStyle from './index.module.scss'

const App: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const menus = await mockMenusApi()
    dispatch(changeMenusAction(menus));
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Space direction="vertical" size="middle" align='center' className={cssStyle.container}>
      <Card>
        <Form
          ref={formRef}
          name="basic"
          colon={false}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true, username: 'admin', password: 'admin' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};

export default App;