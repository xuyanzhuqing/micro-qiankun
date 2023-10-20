import type { ProLayoutProps } from '@ant-design/pro-components';
import {
  CrownOutlined,
  TabletOutlined,
} from '@ant-design/icons';

const proLayoutProps: Partial<ProLayoutProps> = {
  title: 'dnt',
  fixSiderbar: true,
  layout: 'mix',
  splitMenus: false,
  location: {
    pathname: '/home',
  },
  route: {}
}

export default proLayoutProps