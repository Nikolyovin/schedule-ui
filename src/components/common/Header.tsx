import { URL_SERVER } from '@/common'
import { useAppSelector } from '@/hooks/redux'
import { Avatar, Button, Dropdown, Layout, MenuProps } from 'antd'
import Image from 'next/image'
import React, { FC } from 'react'
import { useActions } from '@/hooks/actions'
import { IUser } from '@/models/models'
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

    const pushCalendar: () => void = () => {
        router.push({
            pathname: '/'
        })
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <span onClick={() => pushCalendar()}>Календарь</span>
        },
        {
            key: '2',
            label: <span onClick={() => pushSettings()}>Настройки</span>
        },
        {
            key: '3',
            label: <span onClick={() => setActiveUser({} as IUser)}>Выйти</span>
        }
    ]

    return (
        <Layout.Header>
            <div className='flex justify-between items-center h-full'>
                <div className='bg-slate-300 border rounded-full w-10 '></div>
                <div className='flex justify-center items-center'>
                    <div style={{ backgroundColor: activeUser.color }} className='rounded-full h-3 w-3 mr-1'></div>
                    <span className='text-white text-lg '>{activeUser.name}</span>
                </div>
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
