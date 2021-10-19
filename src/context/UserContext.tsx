import { createContext, useState, useEffect } from 'react'
import API from '../services/API'

export const UserContext = createContext<any>(null)

export default function UserContextProvider({ children }: any) {
    const [users, setUsers] = useState<any>({
        isLoading: false,
        data: [],
        parameters: {
            page: 1,
            pageSize: "10",
            results: "10",
        }
    })

    const reset = () => {
        setUsers((prevState: any) => ({
            ...prevState,
            parameters: {
                page: 1,
                pageSize: "10",
                results: "10",
            }

        }))
    }

    const getUsers = () => {
        setUsers((prevState: any) => ({ ...prevState, isLoading: true }))
        API.getUsers(users.parameters).then((response: any) => {
            setUsers((prevState: any) => ({ ...prevState, isLoading: false, data: response.data.results }))
        }).catch((error) => {
            alert(error.response.error)
        })
    }

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users.parameters.page, users.parameters.results, users.parameters.pageSize, users.parameters.gender, users.parameters.keyword, users.parameters.sortBy, users.parameters.sortOrder])

    return (
        <UserContext.Provider
            value={{
                users,
                getUsers,
                setUsers,
                reset
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

