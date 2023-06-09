import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import { Calendar, Col, Row, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import type { Dayjs } from 'dayjs'
import CellDate from './CellDate'
import { IUser } from '@/models/models'
import { useRouter } from 'next/router'
import moment from 'moment'
import 'dayjs/locale/ru'
import locale from 'antd/lib/calendar/locale/ru_RU.js'
import dynamic from 'next/dynamic'

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

    const dateCellRender: (date: Dayjs) => JSX.Element[] | null = date => {
        if (Object.keys(entries).length !== 0) {
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
        } else {
            return null
        }
    }

    useEffect(() => {
        getEntriesFetch()
        setIsFetching(false)
    }, [isFetching])

    // if (Object.keys(entries).length == 0) return <Loading />

    return (
        // <div className='flex h-[100vh] items-center '>
        <Spin spinning={Object.keys(entries).length == 0} size='large' tip='Загрузка...'>
            <Calendar
                // className='min-h-[100vh]'
                // fullscreen={false}
                // style={{ height: 300 }}
                onPanelChange={(date: Dayjs) => onPanelChange(date)}
                locale={locale}
                onSelect={(date: Dayjs) => onSelect(date)}
                cellRender={(date: Dayjs) => dateCellRender(date)}
            />
        </Spin>
        // </div>
    )
}

// export default CalendarAll

export default dynamic(() => Promise.resolve(CalendarAll), { ssr: false })
// export default Header
