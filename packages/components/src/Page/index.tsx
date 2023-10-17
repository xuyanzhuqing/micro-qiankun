import { Table } from 'antd';
import React from 'react';
// import { ColumnType } from 'antd/es/table/interface'

interface Columns {
  title: string;
  dataIndex: string;
  key: string;
}

function Foo<T extends object>(props: { columns: Columns[]; dataSource: T[] }) {
  return <Table dataSource={props.dataSource} columns={props.columns} />;
}

export default Foo;
