import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { memo } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from 'store/hooks'
import { createFromIconfontCN } from '@ant-design/icons';
import { SelectEventHandler } from 'rc-menu/lib/interface';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import mainCssStyle from './Main.module.scss'

import { logoutApi } from 'apis/auth';

const items: MenuProps['items'] = [
  {
    label: 'logout',
    key: 'logout',
  }
];

const MyIcon = createFromIconfontCN();

const { Header, Content, Sider } = Layout;

const App: React.FC = memo(() => {
  const menus = useAppSelector((state) => {
    return state.login.menus
  })

  const items2: MenuProps['items'] = []

  if (menus) {
    menus.forEach((menu: any) => {
      items2.push({ ...menu, icon: <MyIcon type={menu.icon} /> })
    })
  }

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const onClick: MenuProps['onClick'] = ({ key }) => {
    message.info(`Click on item ${key}`);
    logoutApi().then(res => {
      if (res.data.code === 200) {
        navigate('/login')
      }
    })
  };

  const onSelect: SelectEventHandler = (item) => {
    navigate('/' + item.keyPath.reverse().join('/'), { replace: true })
  }

  const defaultSelected = pathname.slice(1).split('/')
  return (
    <Layout>
      <Header className={mainCssStyle.header}>
        <div className="logo" />
        <Dropdown menu={{ items, onClick }}>
          <span className={mainCssStyle['color-active']}>
            <Space>
              hello
              <DownOutlined />
            </Space>
          </span>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={defaultSelected}
            defaultOpenKeys={defaultSelected}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            onSelect={onSelect}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            this is layout
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
})

export default App;