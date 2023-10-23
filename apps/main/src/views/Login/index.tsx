import { Button, Checkbox, Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
// import { loginApi } from 'apis/auth';
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeMenusAction } from "store/modules/login";
// import { setAuthorization } from '@dnt/utils/lib';
// import { getRoutesApi } from 'apis/route';
// import { registerMicroApps } from 'qiankun';
import { mockMenusApi } from 'mock/routes';
import { dntMicroMenuBuilder } from 'utils/router';
const isPro = process.env.NODE_ENV === 'production'

const App: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // console.info(formRef)
    // const modal = formRef?.current?.getFieldsValue()
    // loginApi(modal).then(res => {
    //   if (res.data.code !== 200) {
    //     return
    //   }
    //   // 这里调用的是刚刚上面redux导出的函数
    //   setAuthorization(res.data.content)
    //   // 获取菜单
    //   getRoutesApi({ mode: isPro ? 1 : 0 }).then(res => {
    //     registerMicroApps(res.data.content)
    //     dispatch(changeMenusAction(makeMenus(res.data.content)));
    //     navigate("/home");
    //   })
    // }).catch((err: any) => {
    //   console.info(err)
    // })

    const menus = await mockMenusApi()
    // registerMicroApps(dntMicroMenuBuilder(menus))
    dispatch(changeMenusAction(menus));
    navigate("/home");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      ref={formRef}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
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
  );
};

export default App;