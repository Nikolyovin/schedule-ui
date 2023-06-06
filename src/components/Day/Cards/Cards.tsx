import Loading from '@/components/common/Loader'
import { IEntry, IUser } from '@/models/models'
import { Card } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

interface IProps {
    entries: IEntry[]
    users: IUser[]
}

const Cards: FC<IProps> = ({ entries, users }) => {
    useEffect(() => {
        if (Object.keys(entries).length === 0) {
            router.push({
                pathname: '/'
            })
        }
    }, [])

    let countCards = 0

    const router = useRouter()
    if (Object.keys(entries).length === 0) return <Loading />

    return (
        <>
            {entries.map(entry => {
                const dateEntry = new Date(entry.date).setHours(0, 0, 0, 0) //setHours(0,0,0,0) для того чтобы сравнить две даты без времени
                const dateCell = new Date(router.query.id).setHours(0, 0, 0, 0) //+date нужен чтобы успокоить ts

                const master: IUser = users.find(user => entry.master === user._id) || ({} as IUser)

                if (dateEntry === dateCell) {
                    countCards++
                    return (
                        <Card
                            headStyle={{ backgroundColor: master.color, border: 0 }}
                            // headStyle={{ borderBlockColor: 'green' }}
                            key={entry._id}
                            className='w-[800px] mt-3'
                            title={master.name}
                        >
                            <p className='text-lg mb-1'>
                                Начало сеанса:
                                <span className='text-2xl '> {moment(entry.time).format('LT')}</span>
                            </p>
                            <p className='text-lg mb-1'> Продолжительность: {entry.duration} ч.</p>
                            <p className='text-lg mb-1'>{entry.clientName}</p>
                            <p className='text-lg mb-1'>Описание: {entry.description}</p>
                        </Card>
                    )
                }
            })}
            {!countCards && (
                // <div className=' h-[100vh] flex justify-center items-center'>
                <p className='text-xl pt-[300px]'>Этот день полностью свободен!</p>
                // </div>
            )}
        </>
    )
}

export default Cards
