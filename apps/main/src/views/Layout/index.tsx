import {
  CrownOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MergeCellsOutlined,
  QuestionCircleOutlined,
  TabletOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Button, Dropdown, Result } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import _defaultProps from './_defaultProps'
import { useImmer } from 'use-immer';
import { dntMenuBuilder, mockMenusApi } from 'mock/routes'
import { useAppSelector } from 'store/hooks';

export default () => {
  const navigate = useNavigate()
  const [proLayoutProps, setProLayoutProps] = useImmer(_defaultProps);
  const menus = useAppSelector((state) => {
    return state.login.menus
  })

  console.info(menus)

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
        <a
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
        </a>
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