import Loading from '@/components/common/Loader'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import { Calendar, Spin } from 'antd'
import React, { useEffect } from 'react'
// import type { Dayjs } from 'dayjs'

const CalendarAll = () => {
  const { getEntriesFetch } = useActions()
  const { entries } = useAppSelector((state) => state.entries)
  // const entries = {}

  console.log('entries', entries)

  const dateCellRenderOld: (date: Date) => JSX.Element = (date) => {
    const currentEntry = entries.find(
      (entry) => new Date(date).getDate() === new Date(entry.date).getDate()
    )

    if (new Date(date).getDate() === new Date(currentEntry?.date).getDate()) {
      return <li key={currentEntry._id}>{currentEntry.clientName}</li>

      // entries.includes((entry) =>( new Date(date).getDate() === entry.date)
      // return <div><div style={{backgroundColor: 'green'}} className='h-3 w-3'></div><span>{entry.clientName}</span></div>
    }
  }

  const dateCellRender: (date: Date) => JSX.Element = (date) => {
    return entries.map((entry) => {
      if (new Date(date).getDate() === new Date(entry.date).getDate()) {
        return <li key={entry._id}>{entry.clientName}</li>
      }
    })
  }

  useEffect(() => {
    getEntriesFetch()
  }, [])

  if (Object.keys(entries).length == 0) return <Loading />

  return (
    <Calendar
      onSelect={(date) => {}}
      cellRender={(date) => dateCellRender(date)}
      // cellRender={(date) => {
      //   const entryDate = entries.find(
      //     (entry) => new Date(date).getDate() === new Date(entry.date).getDate()
      //   )?.date

      //   if (new Date(date).getDate() === new Date(entryDate).getDate()) {
      //     return <li>test</li>
      //   }
      // }}
    />
  )
}

export default CalendarAll
