import Loading from '@/components/common/Loader'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import { Calendar, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import type { Dayjs } from 'dayjs'
import CellDate from './CellDate'
import { IUser } from '@/models/models'
import { useRouter } from 'next/router'
import moment from 'moment'
import 'dayjs/locale/ru'
import locale from 'antd/lib/calendar/locale/ru_RU.js'

const CalendarAll = () => {
    const { getEntriesFetch, setIsFetching, setCurrentDay } = useActions()
    const { entries, isFetching } = useAppSelector(state => state.entries)
    const { users } = useAppSelector(state => state.login)
    const router = useRouter()
    let isPush: boolean = true

    const routerPush = (date: Dayjs) => {
        router.push({
            pathname: '/[id]',
            query: { id: date.toString() }
        })
    }

    const onPanelChange = (date: Dayjs) => {
        isPush = false
    }

    const onSelect = (date: Dayjs) => {
        // const formattedDate = `${moment(date.toDate()).format('dddd')}, ${moment(date.toDate()).format('ll')}`
        setCurrentDay(new Date(+date))

        if (isPush) {
            routerPush(date)
        }
        isPush = true
    }

    //ячейки для календаря
    const dateCellRender: (date: Dayjs) => JSX.Element[] = date => {
        return entries.map(entry => {
            const dateEntry = new Date(entry.date).setHours(0, 0, 0, 0) //setHours(0,0,0,0) для того чтобы сравнить две даты без времени
            const dateCell = new Date(+date).setHours(0, 0, 0, 0) //+date нужен чтобы успокоить ts

            const master: IUser = users.find(user => user._id === entry.master) || ({} as IUser)

            return dateCell === dateEntry && master ? (
                <CellDate
                    key={entry._id}
                    id={entry._id}
                    color={master.color}
                    masterName={master.name}
                    duration={entry.duration}
                />
            ) : (
                <div key={entry._id}></div>
            )
        })
    }

    useEffect(() => {
        getEntriesFetch()
        setIsFetching(false)
    }, [isFetching])

    if (Object.keys(entries).length == 0) return <Loading />

    return (
        <Calendar
            // className='min-h-[calc(100vh-150px)]'
            // fullscreen={false}
            // style={{ height: 300 }}
            onPanelChange={(date: Dayjs) => onPanelChange(date)}
            locale={locale}
            onSelect={(date: Dayjs) => onSelect(date)}
            cellRender={(date: Dayjs) => dateCellRender(date)}
        />
    )
}

export default CalendarAll
