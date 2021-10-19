import { Table, Skeleton } from 'antd';

const columnsDummy = [
    {
        title: <div><Skeleton active paragraph={false} /></div>,
        dataIndex: 'loader1',
    },
    {
        title: <div><Skeleton active paragraph={false} /></div>,
        dataIndex: 'loader2',
    },
    {
        title: <div><Skeleton active paragraph={false} /></div>,
        dataIndex: 'loader3',
    },
    {
        title: <div><Skeleton active paragraph={false} /></div>,
        dataIndex: 'loader4',
    },
];

const dataDummy = [
    {
        key: '1',
        loader1: <div><Skeleton active paragraph={false} /></div>,
        loader2: <div><Skeleton active paragraph={false} /></div>,
        loader3: <div><Skeleton active paragraph={false} /></div>,
        loader4: <div><Skeleton active paragraph={false} /></div>,
    },
    {
        key: '2',
        loader1: <div><Skeleton active paragraph={false} /></div>,
        loader2: <div><Skeleton active paragraph={false} /></div>,
        loader3: <div><Skeleton active paragraph={false} /></div>,
        loader4: <div><Skeleton active paragraph={false} /></div>,
    },
];

const TableLoaderComponent = () => {
    return (
        <Table columns={columnsDummy} dataSource={dataDummy} pagination={false} />
    )
}
export default TableLoaderComponent