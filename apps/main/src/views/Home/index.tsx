// import { getRoutesApiSwr } from "apis/route";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { Pagination, Card, Space } from 'antd';
import { Page } from '@dnt/components'

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

const App: React.FC = () => {
  // const { data, isLoading } = getRoutesApiSwr()

  // if (isLoading) {
  //   return (
  //     <div>loading</div>
  //     )
  //   }
  const { t } = useTranslation();

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="跳转微服务" size="small">
          <Link to="/system/rhino">to rhino</Link>
        </Card>
        <Card title="多语言" size="small">
          <Space>
            <span>{t("submit")}</span>
            <span>{t('add', { ns: 'system' })}</span>
            <span>{t('role', { ns: 'user' })}</span>
            <Trans i18nKey="submit">trans</Trans>
          </Space>
          <Pagination showQuickJumper defaultCurrent={2} total={500} />
        </Card>
        <Card title="组建" size="small">
          <Page dataSource={dataSource} columns={columns} />
        </Card>
        <Card title="接口调用" size="small">
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
      </Space>
    </div>
  )
};

export default App;