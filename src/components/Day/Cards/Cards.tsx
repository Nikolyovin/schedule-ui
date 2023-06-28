import Loading from '@/components/common/Loader'
import { IEntry, IUser } from '@/models/models'
import { Card } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import ButtonsCard from './ButtonsCard/ButtonsCard'
import TheCard from './TheCard/TheCard'

interface IProps {
    entries: IEntry[]
    users: IUser[]
}

const Cards: FC<IProps> = ({ entries, users }) => {
    let countCards = 0

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
                        return <TheCard key={entry._id} entry={entry} master={master} />
                    }
                })}
            {!countCards && (
                // <div className=' h-[100vh] flex justify-center items-center'>
                <p className='text-xl md:pt-[300px] pt-[200px]'>Этот день полностью свободен!</p>
                // </div>
            )}
        </>
    )
}

export default Cards
