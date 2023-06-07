import Loading from '@/components/common/Loader'
import { IEntry, IUser } from '@/models/models'
import { CloseCircleOutlined, CloseOutlined, CloseSquareOutlined } from '@ant-design/icons'
import { Button, Card, Popconfirm } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import ButtonCancel from './ButtonCancel/ButtonCancel'

interface IProps {
    entries: IEntry[]
    users: IUser[]
}

const Cards: FC<IProps> = ({ entries, users }) => {
    // useEffect(() => {
    //     if (Object.keys(entries).length === 0) {
    //         router.push({
    //             pathname: '/'
    //         })
    //     }
    // }, [])

    let countCards = 0
    console.log('entries', entries)

    // const sortEntries =
    //     entries.length !== 0 ? [...entries].sort((a, b) => new Date(a.time).valueOf() - new Date(b.time).valueOf()) : []

    const router = useRouter()
    if (Object.keys(entries).length === 0) return <Loading />

    return (
        <>
            {[...entries]
                .sort((a, b) => moment(a.time).format('HH:mm').localeCompare(moment(b.time).format('HH:mm')))
                .map(entry => {
                    const dateEntry = new Date(entry.date).setHours(0, 0, 0, 0) //setHours(0,0,0,0) для того чтобы сравнить две даты без времени
                    const dateCell = new Date(router.query.id).setHours(0, 0, 0, 0) //+date нужен чтобы успокоить ts

                    const master: IUser = users.find(user => entry.master === user._id) || ({} as IUser)

                    if (dateEntry === dateCell) {
                        countCards++
                        return (
                            <Card
                                headStyle={{ backgroundColor: master.color, border: 0 }}
                                key={entry._id}
                                className='w-[800px] mt-3'
                                title={master.name}
                            >
                                <div className='flex mb-1'>
                                    <p className='text-lg '>
                                        Начало сеанса:
                                        <span className='text-2xl font-medium'>
                                            {' '}
                                            {moment(entry.time).format('HH:mm')};{' '}
                                        </span>
                                    </p>
                                    <p className='text-lg ml-2'>
                                        Продолжительность:{' '}
                                        <span className='text-2xl font-medium'>{entry.duration} ч.</span>
                                    </p>
                                </div>
                                <p className='text-lg mb-1'>
                                    Имя клиента: <span className='font-medium text-xl'>{entry.clientName}</span>
                                </p>
                                <p className='text-lg mb-1'>
                                    Описание: <span className='font-medium text-xl '>{entry.description}</span>
                                </p>
                                <ButtonCancel entryId={entry._id} />
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
