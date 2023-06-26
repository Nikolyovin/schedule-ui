import { Avatar, Card } from 'antd'
import React, { FC } from 'react'
import ButtonsCard from '../ButtonsCard/ButtonsCard'
import { IEntry, IUser } from '@/models/models'
import moment from 'moment'
import { useAppSelector } from '@/hooks/redux'
import HeaderCard from './HeaderCard/HeaderCard'
// import Meta from 'antd/es/card/Meta'

interface IProps {
    entry: IEntry
    master: IUser
}

const TheCard: FC<IProps> = ({ entry, master }) => {
    const { activeUser } = useAppSelector(state => state.login)
    return (
        <Card
            headStyle={{ backgroundColor: master.color, border: 0 }}
            className='w-[800px] mt-3 '
            cover={
                <HeaderCard master={master} />
                // <Card.Meta
                //     className=''
                //     avatar={<Avatar src={master.picture} />}
                //     title={master.name}
                //     style={{
                //         backgroundColor: master.color,
                //         height: 56,
                //         paddingLeft: 15,
                //         display: 'flex',
                //         alignItems: 'center',
                //         borderRadius: 10,
                //         borderBottomLeftRadius: 0,
                //         borderBottomRightRadius: 0
                //         // border: 0
                //     }}
                //     // description='This is the description'
                // />
            }
        >
            <div className='flex mb-1'>
                <p className='text-lg '>
                    Начало сеанса:
                    <span className='text-2xl font-medium'> {moment(entry.time).format('HH:mm')}; </span>
                </p>
                <p className='text-lg ml-2'>
                    Продолжительность: <span className='text-2xl font-medium'>{entry.duration} ч.</span>
                </p>
            </div>
            <p className='text-lg mb-1'>
                Имя клиента: <span className='font-medium text-xl'>{entry.clientName}</span>
            </p>
            <p className='text-lg mb-1'>
                Описание: <span className='font-medium text-xl '>{entry.description}</span>
            </p>
            {entry.master === activeUser._id ? <ButtonsCard entry={entry} /> : <></>}
        </Card>
    )
}

export default TheCard
