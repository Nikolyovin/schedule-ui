import { URL_SERVER } from '@/common'
import { useAppSelector } from '@/hooks/redux'
import { Avatar, Dropdown, Layout, MenuProps } from 'antd'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { useActions } from '@/hooks/actions'
import { IUser } from '@/models/models'
import { UserOutlined } from '@ant-design/icons'
import dynamic from 'next/dynamic'

const Header: FC = () => {
    const { activeUser } = useAppSelector(state => state.login)
    const { setActiveUser } = useActions()

    // const { login, name } = activeUser

    //нужно для обхода ошибки гидрации
    const [name, setName] = useState('')
    const [src, setSrc] = useState('')
    // const [hudrateName, setHudratedName] = useState('')
    useEffect(() => {
        setName(activeUser.name)
        setSrc(`${URL_SERVER}/${activeUser?.picture}`)
    }, [])

    // const src = `${URL_SERVER}/${picture}`

    ///
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <span onClick={() => setActiveUser({} as IUser)}>Выйти</span>
        }
    ]
    ///

    return (
        <Layout.Header>
            <div className='flex justify-between items-center h-full'>
                <div className='bg-slate-300 bordeer rounded-full w-10 '></div>
                <span className='text-white text-lg'>{name}</span>
                {/* <div className='bg-slate-300 bordeer rounded-full w-10 h-10 '> */}
                <Dropdown menu={{ items }}>
                    {/* <span> */}
                    {/* <Image
            className='bg-slate-300 bordeer rounded-full object-cover p-0, m-0'
            loader={() => src}
            src={src}
            width={30}
            height={30}
            alt='avatar'
          /> */}
                    {/* <StaticContent> */}
                    {activeUser.picture ? (
                        <Avatar src={src} />
                    ) : (
                        <Avatar style={{ backgroundColor: '#f56a00' }} icon={<UserOutlined />} />
                    )}
                    {/* </StaticContent> */}
                    {/* </span> */}
                </Dropdown>
                {/* <img src={`${URL_SERVER}/${picture}`} /> */}
                {/* </div> */}
            </div>
        </Layout.Header>
    )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
