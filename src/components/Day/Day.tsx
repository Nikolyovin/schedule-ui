import Header from '@/components/Home/Header/Header'
import { useAppSelector } from '@/hooks/redux'
import { Card, Layout } from 'antd'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import Cards from './Cards/Cards'
import Loading from '../common/Loader'
import { useActions } from '@/hooks/actions'

const Day = () => {
    const { entries, currentDay, isFetching } = useAppSelector(state => state.entries)
    const { users } = useAppSelector(state => state.login)
    const { getEntriesFetch, setIsFetching } = useActions()

    useEffect(() => {
        getEntriesFetch()
        setIsFetching(false)
    }, [isFetching])

    return (
        <>
            <Header />
            <div className='bg-slate-50 min-h-[100vh]'>
                <p className='capitalize text-center pt-5 text-2xl '>{currentDay}</p>
                <div className=' flex flex-col justify-center items-center p-5'>
                    <Cards entries={entries} users={users} />
                </div>
            </div>
        </>
    )
}

export default Day
