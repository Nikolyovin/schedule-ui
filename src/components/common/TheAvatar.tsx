import { URL_SERVER } from '@/common'
import { useAppSelector } from '@/hooks/redux'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import dynamic from 'next/dynamic'
import React, { FC } from 'react'

interface IProps {
    size: number
}

const TheAvatar: FC<IProps> = ({ size }) => {
    const { activeUser } = useAppSelector(state => state.login)
    const source = `${URL_SERVER}/${activeUser?.picture}`
    return (
        <>
            {activeUser.picture ? (
                <Avatar size={size} src={source} />
            ) : (
                <Avatar style={{ backgroundColor: '#f56a00' }} icon={<UserOutlined />} />
            )}
        </>
    )
}

// export default TheAvatar
export default dynamic(() => Promise.resolve(TheAvatar), { ssr: false })