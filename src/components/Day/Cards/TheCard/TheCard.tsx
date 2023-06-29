import { Avatar, Card } from 'antd'
import React, { FC } from 'react'
import ButtonsCard from '../ButtonsCard/ButtonsCard'
import { IEntry, IUser } from '@/models/models'
import moment from 'moment'
import { useAppSelector } from '@/hooks/redux'
import HeaderCard from './HeaderCard/HeaderCard'
import dynamic from 'next/dynamic'
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
            className='md:w-[800px] w-[300px] mt-3'
            cover={<HeaderCard master={master} />}
        >
            <div className='md:flex 2xl:mb-1'>
                <p className='text-lg text-sm'>
                    Начало сеанса:
                    <span className='2xl:text-2xl text-sm font-medium'> {moment(entry.time).format('HH:mm')}; </span>
                </p>
                <p className='text-lg md:ml-2 text-sm'>
                    Продолжительность: <span className='2xl:text-2xl font-medium'>{entry.duration} ч.</span>
                </p>
            </div>
            <p className='text-lg 2xl:mb-1 text-sm'>
                Имя клиента: <span className='font-medium 2xl:text-xl text-sm'>{entry.clientName}</span>
            </p>
            <p className='text-lg 2xl:mb-1 text-sm'>
                Описание: <span className='font-medium 2xl:text-xl text-sm'>{entry.description}</span>
            </p>
            {entry.master === activeUser._id ? <ButtonsCard entry={entry} /> : <></>}
        </Card>
    )
}

// export default TheCard

export default dynamic(() => Promise.resolve(TheCard), { ssr: false })
