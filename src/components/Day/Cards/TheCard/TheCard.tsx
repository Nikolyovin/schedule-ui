import { Card } from 'antd'
import React, { FC } from 'react'
import ButtonsCard from '../ButtonsCard/ButtonsCard'
import { IEntry, IUser } from '@/models/models'
import moment from 'moment'
import { useAppSelector } from '@/hooks/redux'

interface IProps {
    entry: IEntry
    master: IUser
}

const TheCard: FC<IProps> = ({ entry, master }) => {
    const { activeUser } = useAppSelector(state => state.login)
    return (
        <Card headStyle={{ backgroundColor: master.color, border: 0 }} className='w-[800px] mt-3' title={master.name}>
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
