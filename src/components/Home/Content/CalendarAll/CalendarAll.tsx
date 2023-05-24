import Loading from '@/components/common/Loader'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import { Calendar, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import type { Dayjs } from 'dayjs'

const CalendarAll = () => {
  const { getEntriesFetch, setIsFetching } = useActions()
  const { entries, isFetching } = useAppSelector((state) => state.entries)
  // const entries = {}

  console.log('entries', entries)

  const dateCellRender: (date: Dayjs) => JSX.Element[] = (date) => {
    return entries.map((entry) => {
      return new Date(+date).getDate() === new Date(entry.date).getDate() ? ( //+date нужен чтобы успокоить ts
        <li key={entry._id}>{entry.clientName}</li>
      ) : (
        <></>
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
      onSelect={(date) => {}}
      cellRender={(date: Dayjs) => dateCellRender(date)}
    />
  )
}

export default CalendarAll
