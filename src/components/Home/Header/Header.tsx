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
import TheAvatar from '@/components/common/TheAvatar'

const Header: FC = () => {
    const { activeUser } = useAppSelector(state => state.login)
    const { setActiveUser } = useActions()
    const router = useRouter()

    const pushSettings: () => void = () => {
        router.push({
            pathname: '/settings'
        })
    }

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

    return (
        <Layout.Header>
            <div className='flex justify-between items-center h-full'>
                <div className='bg-slate-300 bordeer rounded-full w-10 '></div>
                <span className='text-white text-lg'>{activeUser.name}</span>
                <Dropdown arrow trigger={['click']} menu={{ items }}>
                    <div>
                        <TheAvatar size={40} />
                    </div>
                </Dropdown>
            </div>
        </Layout.Header>
    )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
// export default Header
