import { URL_SERVER } from '@/common'
import { useAppSelector } from '@/hooks/redux'
import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import dynamic from 'next/dynamic'
import React, { FC } from 'react'

interface IProps {
    size: number
    picture?: string
}

const TheAvatar: FC<IProps> = ({ size, picture }) => {
    const { activeUser } = useAppSelector(state => state.login)
    // const source = picture ? `${URL_SERVER}/${picture}` : `${URL_SERVER}/${activeUser?.picture}`
    const source = `${URL_SERVER}/${picture}`
    console.log('picture', picture);
    
    // const source = switch(picture) {
    //     case 'undefined'
    // }

    return (
        <>
            {picture ? (
                <Avatar size={size} src={source} />
            ) : (
                <Avatar size={size} style={{ backgroundColor: '#f56a00' }} icon={<UserOutlined />} />
            )}
        </>
    )
}

// export default TheAvatar
export default dynamic(() => Promise.resolve(TheAvatar), { ssr: false })
