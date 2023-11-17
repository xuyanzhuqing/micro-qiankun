import {
  GlobalOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Dropdown } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import _defaultProps from './_defaultProps'
import { useImmer } from 'use-immer';
import { mockMenusApi } from 'mock/routes'
import { dntMenuBuilder } from 'utils/router';
import { Language } from '@dnt/locale';
import { storeShared, EventBusType } from '_qiankun';
import { getI18n, useTranslation } from 'react-i18next';
// import { useAppSelector } from 'store/hooks';
import theme from '@dnt/theme/lib/index'
import { useEffect } from 'react';
import { changeMenusAction } from 'store/modules/login';
import { useDispatch } from 'react-redux';
import logo from '../../logo.svg'

const collapsedStyle = {
  color: 'rgba(255, 255, 255, .65)',
  marginLeft: '20px'
}

const Layout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [proLayoutProps, setProLayoutProps] = useImmer(_defaultProps);
  const changeLanguage = (lng: Language) => {
    storeShared.emit(EventBusType.SET_LANGUAGE, { lng })
  }

  // const menus = useAppSelector((state) => {
  //   return state.login.menus
  // })

  useEffect(() => {
    (async () => {
      const menus = await mockMenusApi()
      dispatch(changeMenusAction(menus));
      // navigate("/home");
    })()
  }, [dispatch])

  const { t } = useTranslation();
  const i18n = getI18n()

  const toggleCollapsed = () => {
    setProLayoutProps(props => {
      props.collapsed = !props.collapsed;
    })
  }

  const CollapsedHandler = proLayoutProps.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
  return (
    <ProLayout
      token={theme.basicTheme.proLayout}
      {...proLayoutProps}
      collapsedButtonRender={collapsed => null}
      headerTitleRender={() => {
        return (
          <>
            <img src={logo} alt="logo" />
            <h1>DNT</h1>
            <CollapsedHandler onClick={toggleCollapsed} style={collapsedStyle} />
          </>
        )
      }}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'small',
        title: 'Admin',
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: t('logout'),
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
        locale: true,
        request: async () => {
          const res = await mockMenusApi().then(dntMenuBuilder) as any
          return res.routes
        }
      }}
      actionsRender={() => [
        <Dropdown
          menu={{
            items: [
              {
                key: Language.zh_CN,
                label: '中',
                onClick: () => changeLanguage(Language.zh_CN)
              },
              {
                key: Language.en_GB,
                label: 'En',
                onClick: () => changeLanguage(Language.en_GB)
              },
            ],
          }}
        >
          <GlobalOutlined />
        </Dropdown>,
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
            Power by DNT
          </p>
        );
      }}
      onMenuHeaderClick={(e) => console.log(e)}
      menuDataRender={items => {
        return items.map(item => {
          item.name = item.lang[i18n.language]
          item.children = (item.children || []).map(child => {
            child.name = child.lang[i18n.language]
            return child
          })
          return item
        })
      }}
      menuItemRender={(item, dom) => {
        return (
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
        )
      }}
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