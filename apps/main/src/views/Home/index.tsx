// import { getRoutesApiSwr } from "apis/route";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { Pagination, Card, Space, Button, Checkbox, Form, Input } from 'antd';
import { Page } from '@dnt/components'
import { validatorChar } from '@dnt/utils/lib/validator'
import { PageContainer, ProCard } from "@ant-design/pro-components";
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

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
];

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


const App: React.FC = () => {
  // const { data, isLoading } = getRoutesApiSwr()

  // if (isLoading) {
  //   return (
  //     <div>loading</div>
  //     )
  //   }
  const { t } = useTranslation();
  const { t: tHome } = useTranslation('home')
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <Card title={t('jumpToMicro', { ns: 'home' })} size="small">
        <Link to="/system/rhino">to rhino</Link>
      </Card>
      <Card title={tHome('international')} size="small">
        <Space direction="vertical">
          <span>{t('date', { value: 'Fri Nov 17 2023 16:35:27 GMT+0800 (中国标准时间)' })}</span>
          <span>{t("submit")}</span>
          <span>{t('add', { ns: 'system' })}</span>
          <span>{t('role', { ns: 'user' })}</span>
          <Trans i18nKey="submit">trans</Trans>
        </Space>
        <Pagination showQuickJumper defaultCurrent={2} total={500} />
      </Card>
      <Card title={tHome('components')} size="small">
        <Page dataSource={dataSource} columns={columns} />
      </Card>
      <Card title={tHome('useApi')} size="small">
        <table>
          <tbody>
            {/* {
                (data?.data.content || []).map(data => {
                  return <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.activeRule}</td>
                    <td>{data.entry}</td>
                  </tr>
                })
              } */}
          </tbody>
        </table>
      </Card>
      <Card title={tHome('formInternational')} size="small">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label={t('username')}
            name="username"
            rules={[
              { required: true },
              validatorChar
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={t('password')}
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
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
  )
};

export default App;