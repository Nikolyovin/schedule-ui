import { URL_SERVER } from '@/common'
import { useAppSelector } from '@/hooks/redux'
import { Avatar, Button, Dropdown, Layout, MenuProps } from 'antd'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { useActions } from '@/hooks/actions'
import { IUser } from '@/models/models'
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Header: FC = () => {
    const { activeUser } = useAppSelector(state => state.login)
    const { setActiveUser } = useActions()
    const router = useRouter()

    // const { login, name } = activeUser

    //нужно для обхода ошибки гидрации
    const [name, setName] = useState('')
    const [src, setSrc] = useState('')
    // const [hudrateName, setHudratedName] = useState('')
    useEffect(() => {
        setName(activeUser.name)
        setSrc(`${URL_SERVER}/${activeUser?.picture}`)
    }, [])

    const pushSettings: () => void = () => {
        router.push({
            pathname: '/settings'
        })
    }

    // const src = `${URL_SERVER}/${picture}`

    ///
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <span onClick={() => setActiveUser({} as IUser)}>Выйти</span>
        },
        {
            key: '2',
            label: <span onClick={() => pushSettings()}>Настройки</span>
        }
    ]
    ///

    return (
        <Layout.Header>
            <div className='flex justify-between items-center h-full'>
                <div className='bg-slate-300 bordeer rounded-full w-10 '></div>
                {/* <Button type='primary' shape='circle' icon={<PlusCircleOutlined />} /> */}
                {/* <Button type='primary'>Добавить</Button> */}
                <span className='text-white text-lg'>{name}</span>
                {/* <div className='bg-slate-300 bordeer rounded-full w-10 h-10 '> */}
                <Dropdown menu={{ items }}>
                    {activeUser.picture ? (
                        <Avatar src={src} />
                    ) : (
                        <Avatar style={{ backgroundColor: '#f56a00' }} icon={<UserOutlined />} />
                    )}
                </Dropdown>
            </div>
        </Layout.Header>
    )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
