import TheAvatar from '@/components/common/TheAvatar'
import { IUser } from '@/models/models'
import { Card } from 'antd'
import React, { FC } from 'react'

interface IProps {
    master: IUser
}

const HeaderCard: FC<IProps> = ({ master }) => {
    return (
        <Card.Meta
            className=''
            avatar={<TheAvatar picture={master.picture} size={40} />}
            title={master.name}
            style={{
                backgroundColor: master.color,
                height: 56,
                paddingLeft: 15,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
                // border: 0
            }}
        />
    )
}

export default HeaderCard
