import {
  InfoCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Dropdown } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import _defaultProps from './_defaultProps'
import { useImmer } from 'use-immer';
import { mockMenusApi } from 'mock/routes'
import { dntMenuBuilder } from 'utils/router';

const Layout = () => {
  const navigate = useNavigate()
  const [proLayoutProps, setProLayoutProps] = useImmer(_defaultProps);

  return (
    <ProLayout
      {...proLayoutProps}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'small',
        title: '七妮妮',
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: () => {
                      navigate('/login')
                    }
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      menu={{
        request: async () => {
          const res = await mockMenusApi().then(dntMenuBuilder) as any
          return res.routes
        }
      }}
      actionsRender={() => [
        <InfoCircleOutlined key="InfoCircleOutlined" />,
      ]}
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined;
        return (
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(0,0,0,0.6)',
              paddingBlockStart: 12,
            }}
          >
            Power by Ant Design
          </p>
        );
      }}
      onMenuHeaderClick={(e) => console.log(e)}
      menuItemRender={(item, dom) => (
        <div
          onClick={() => {
            setProLayoutProps(props => {
              if (props.location) {
                props.location.pathname = item.path || '/home'
                navigate(props.location.pathname)
              }
            })
          }}
        >
          {dom}
        </div>
      )}
    >
      <PageContainer title={false}>
        <ProCard>
          <Outlet />
        </ProCard>
      </PageContainer>
    </ProLayout>
  );
};

export default Layout