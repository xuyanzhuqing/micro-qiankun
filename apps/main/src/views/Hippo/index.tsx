import { DownOutlined } from '@ant-design/icons';
import type {
  ProColumnType,
  ProFormInstance,
  ProTableProps,
} from '@ant-design/pro-components';
import {
  ProCard,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

type DataType = {
  age: number;
  address: string;
  name: string;
  time: number;
  key: number;
  description: string;
};

const columns: ProColumnType<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'time',
    dataIndex: 'time',
    valueType: 'time',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    valueType: 'select',
    filters: true,
    onFilter: true,
    valueEnum: {
      london: {
        text: '伦敦',
      },
      'New York': {
        text: '纽约',
      },
    },
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    valueType: 'option',
    render: () => [
      <a key="delete">Delete</a>,
      <a key="link" className="ant-dropdown-link">
        More actions <DownOutlined />
      </a>,
    ],
  },
];

const genData = (index: number, pageSize: number) => {
  const data: DataType[] = [];
  const start = index * pageSize
  const end = start + pageSize
  for (let i = start; i < end; i += 1) {
    data.push({
      key: i,
      name: 'John Brown',
      age: i + 10,
      time: 1661136793649 + i * 1000,
      address: i % 2 === 0 ? 'london' : 'New York',
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    });
  }
  return data;
};

// 自定义 query string
type Params = {
  filter: string
}

const initData: ProTableProps<DataType, Params> = {
  bordered: true,
  loading: false,
  columns,
  pagination: {
    pageSize: 10,
    current: 1,
    total: 100,
  },
  size: 'small',
  headerTitle: '高级表格',
  tooltip: '高级表格 tooltip',
  showHeader: true,
  rowSelection: {},
  tableLayout: undefined,
  search: {
    span: 12,
    labelWidth: 80,
    filterType: 'query',
    layout: 'horizontal',
  },
  options: {
    density: true,
    fullScreen: true,
    setting: true,
  },
};

const Hippo = () => {
  const ref = useRef<ProFormInstance>();
  const [config, setConfig] = useState(initData);
  const tableColumns = (config.columns || columns)?.map((item: any) => ({
    ...item,
    ellipsis: true,
  }));

  const params: Params = {
    filter: 'xxxx'
  }

  return (
    <ProCard
      split="vertical"
      bordered
      headerBordered
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <ProCard
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <ProTable
          {...config}
          locale={{ filterReset: '重置', filterConfirm: '确定' }}
          formRef={ref}
          pagination={config.pagination}
          search={config.search}
          expandable={
            config.expandable && {
              expandedRowRender: (record: DataType) => (
                <p>{record.description}</p>
              ),
            }
          }
          options={config.options}
          toolBarRender={
            config?.toolBarRender
              ? () => [
                <Button key="refresh" type="primary">
                  刷新
                </Button>,
              ]
              : false
          }
          footer={config.footer}
          headerTitle={config.headerTitle}
          columns={tableColumns}
          request={async (
            // 第一个参数 params 查询表单和 params 参数的结合
            // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
            params,
            sort,
            filter,
          ) => {
            return {
              data: genData(params?.current ?? 0, params?.pageSize ?? 10),
              success: true,
              total: 100
            }
          }}
          scroll={config.scroll}
        />
      </ProCard>
    </ProCard>
  );
};

export default Hippo;