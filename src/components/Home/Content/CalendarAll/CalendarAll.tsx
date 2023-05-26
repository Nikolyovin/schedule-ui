import Loading from '@/components/common/Loader'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import { Calendar, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import type { Dayjs } from 'dayjs'
import CellDate from './CellDate'
import { IUser } from '@/models/models'

const CalendarAll = () => {
  const { getEntriesFetch, setIsFetching } = useActions()
  const { entries, isFetching } = useAppSelector((state) => state.entries)
  const { users } = useAppSelector((state) => state.login)
  const headerRender = () => null

  const dateCellRender: (date: Dayjs) => JSX.Element[] = (date) => {
    return entries.map((entry) => {
      const dateEntry = new Date(entry.date).setHours(0, 0, 0, 0) //setHours(0,0,0,0) для того чтобы сравнить две даты без времени
      const dateCell = new Date(+date).setHours(0, 0, 0, 0) //+date нужен чтобы успокоить ts

      const master: IUser =
        users.find((user) => user._id === entry.master) || ({} as IUser)

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
      // headerRender={headerRender}
      onSelect={(date) => {}}
      cellRender={(date: Dayjs) => dateCellRender(date)}
    />
  )
}

export default CalendarAll
