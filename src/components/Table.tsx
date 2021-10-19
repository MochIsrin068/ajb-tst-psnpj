import { Table } from 'antd';

type propsType = {
    columns: Array<any>,
    data: Array<any>,
    handleChange: any
}

export default function TableComponent({ columns, data, handleChange }: propsType) {

    return (
        <Table columns={columns} dataSource={data} onChange={handleChange} pagination={false} size='small' />
    )
}

