import { URL_SERVER } from '@/common'
import { useAppSelector } from '@/hooks/redux'
import { Avatar, Dropdown, Layout, MenuProps } from 'antd'
import Image from 'next/image'
import React, { FC } from 'react'
import { useActions } from '@/hooks/actions'
import { IUser } from '@/models/models'
import { UserOutlined } from '@ant-design/icons'

const Header: FC = () => {
  const { activeUser } = useAppSelector((state) => state.login)
  const { setActiveUser } = useActions()
  const { login, name } = activeUser
  const src = `${URL_SERVER}/${activeUser?.picture}`
  console.log('picture', activeUser?.picture)

  ///
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span onClick={() => setActiveUser({} as IUser)}>Выйти</span>,
    },
  ]
  ///

  return (
    <Layout.Header>
      <div className='flex justify-between items-center h-full'>
        <div className='bg-slate-300 bordeer rounded-full w-10 '></div>
        <span className='text-white text-lg'>{name}</span>
        {/* <div className='bg-slate-300 bordeer rounded-full w-10 h-10 '> */}
        <Dropdown menu={{ items }}>
          {/* <Image
            className='bg-slate-300 bordeer rounded-full object-cover p-0, m-0'
            loader={() => src}
            src={src}
            width={30}
            height={30}
            alt='avatar'
          /> */}
          {activeUser.picture ? (
            <Avatar src={src} />
          ) : (
            <Avatar
              style={{ backgroundColor: '#f56a00' }}
              icon={<UserOutlined />}
            />
          )}
        </Dropdown>
        {/* <img src={`${URL_SERVER}/${picture}`} /> */}
        {/* </div> */}
      </div>
    </Layout.Header>
  )
}

export default Header
