import Loading from '@/components/common/Loader'
import { IEntry } from '@/models/models'
import { Card } from 'antd'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'

interface IProps {
  entries: IEntry[]
}

const Cards: FC<IProps> = ({ entries }) => {
  useEffect(() => {
    if (Object.keys(entries).length === 0) {
      router.push({
        pathname: '/',
      })
    }
  }, [])

  const router = useRouter()
  if (Object.keys(entries).length === 0) return <Loading />
  console.log('***********entries:', entries)

  return (
    <>
      {entries.map((entry) => {
        const dateEntry = new Date(entry.date).setHours(0, 0, 0, 0) //setHours(0,0,0,0) для того чтобы сравнить две даты без времени
        const dateCell = new Date(router.query.id).setHours(0, 0, 0, 0) //+date нужен чтобы успокоить ts
        console.log('dateCell', dateCell)
        console.log('dateEntry', dateEntry)

        return dateEntry === dateCell ? (
          <Card key={entry._id} className='w-[800px] mt-3' title={'Карточка'}>
            <p>{entry.time.toString()}e</p>
            <p>{entry.duration} часов</p>
            <p>{entry.clientName}</p>
            <p>{entry.description}</p>
          </Card>
        ) : (
          <div key={entry._id}></div>
        )
      })}
    </>
  )
}

export default Cards
