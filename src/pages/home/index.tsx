import { useContext, useState } from 'react'
import { Button, Space, Pagination, Input, Select } from 'antd';

import TableComponent from '../../components/Table'
import TableLoaderComponent from '../../components/TableLoader'
import { UserContext } from '../../context/UserContext'

import Layout from '../../layout'
import { convertUTCtoDates } from '../../utils/DateConverter';

const { Search } = Input
const { Option } = Select

export default function Home() {
    const userContext = useContext(UserContext)

    const [sortedInfo, setSortedInfo] = useState<any>({})
    const [keyword, setKeyword] = useState("")

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        console.log('Various parameters', pagination, filters, sorter);

        if (sortedInfo.order === undefined || sortedInfo.order !== "descend") {
            setSortedInfo({
                order: 'descend',
                columnKey: `${sorter.columnKey}`,
            })

            userContext.setUsers((prevState: any) => ({
                ...prevState,
                parameters: {
                    ...prevState.parameters,
                    sortBy: `${sorter.columnKey}`,
                    sortOrder: 'descend'
                }
            }))
        } else {
            setSortedInfo({
                order: 'ascend',
                columnKey: `${sorter.columnKey}`,
            })

            userContext.setUsers((prevState: any) => ({
                ...prevState,
                parameters: {
                    ...prevState.parameters,
                    sortBy: `${sorter.columnKey}`,
                    sortOrder: 'ascend'
                }
            }))
        }

    };

    const clearAllState = () => {
        setSortedInfo({})
        setKeyword("")
    };

    const data = userContext.users.data.map((items: any, index: any) => {
        return {
            key: `${index + 1}`,
            username: items.login.username,
            name: `${items.name.first} ${items.name.last}`,
            email: items.email,
            gender: items.gender,
            registered: convertUTCtoDates(items.registered.date),
        }
    })


    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name.first - b.name.first,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: any, b: any) => a.email - b.email,
            sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a: any, b: any) => a.gender - b.gender,
            sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Registered Date',
            dataIndex: 'registered',
            key: 'registered',
            sorter: (a: any, b: any) => a.registered.date - b.registered.date,
            sortOrder: sortedInfo.columnKey === 'registered' && sortedInfo.order,
            ellipsis: true,
        },
    ];


    return (
        <Layout>
            <div className='home'>
                <section className='home__filter'>
                    <div>
                        <Space style={{ marginBottom: 16 }}>
                            <Search style={{ fontSize: 13 }} placeholder="Search..." value={keyword}
                                onChange={({ target: { value } }) => {
                                    setKeyword(value)
                                    if (value === "") {
                                        userContext.setUsers({
                                            isLoading: userContext.users.isLoading,
                                            data: userContext.users.data,
                                            parameters: {
                                                page: userContext.users.parameters.page,
                                                pageSize: userContext.users.parameters.pageSize,
                                                results: userContext.users.parameters.results
                                            }
                                        })
                                    }
                                }}
                                onSearch={() => {
                                    if (keyword === "") {
                                        userContext.setUsers({
                                            isLoading: userContext.users.isLoading,
                                            data: userContext.users.data,
                                            parameters: {
                                                page: userContext.users.parameters.page,
                                                pageSize: userContext.users.parameters.pageSize,
                                                results: userContext.users.parameters.results
                                            }
                                        })
                                    } else {
                                        userContext.setUsers((prevState: any) => ({
                                            ...prevState,
                                            parameters: {
                                                ...prevState.parameters,
                                                keyword: keyword
                                            }
                                        }))
                                    }
                                }} enterButton />
                            <Select
                                value={userContext.users.parameters.gender === undefined ? "all" : userContext.users.parameters.gender}
                                style={{ width: 200, fontSize: 13 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={(value) => {
                                    if (value === "all") {
                                        userContext.setUsers({
                                            isLoading: userContext.users.isLoading,
                                            data: userContext.users.data,
                                            parameters: {
                                                page: userContext.users.parameters.page,
                                                pageSize: userContext.users.parameters.pageSize,
                                                results: userContext.users.parameters.results
                                            }
                                        })
                                    } else {
                                        userContext.setUsers((prevState: any) => ({
                                            ...prevState,
                                            parameters: {
                                                ...prevState.parameters,
                                                gender: value
                                            }
                                        }))
                                    }
                                }}
                            >
                                <Option value="all" style={{ fontSize: 13 }}>All</Option>
                                <Option value="male" style={{ fontSize: 13 }}>Male</Option>
                                <Option value="female" style={{ fontSize: 13 }}>Female</Option>
                            </Select>,
                        </Space>
                    </div>
                    <div>
                        <Space style={{ marginBottom: 16 }}>
                            <Button onClick={() => {
                                userContext.reset()
                                clearAllState()
                            }} style={{ fontSize: 13 }}>Reset Filter</Button>
                        </Space>
                    </div>
                </section>
                <section className='home__view'>
                    {userContext.users.isLoading ?
                        <TableLoaderComponent />
                        :
                        <TableComponent columns={columns} data={data} handleChange={handleChange} />
                    }
                </section>
                <section className='home__pagination'>
                    <Pagination
                        total={50}
                        showSizeChanger
                        onShowSizeChange={(current, pageSize) => {
                            userContext.setUsers((prevState: any) => ({
                                ...prevState,
                                parameters: {
                                    ...prevState.parameters,
                                    page: current,
                                    results: pageSize
                                }
                            }))
                        }}
                        onChange={(page) => userContext.setUsers((prevState: any) => ({
                            ...prevState,
                            parameters: {
                                ...prevState.parameters,
                                page: page
                            }
                        }))}
                        current={userContext.users.parameters.page}
                        pageSizeOptions={["10", "20", "30", "50"]}
                        pageSize={userContext.users.parameters.results}
                    />
                </section>
            </div>
        </Layout>
    )
}
