import Header from '@/components/Home/Header/Header'
import { useAppSelector } from '@/hooks/redux'
import { Button, Card, Layout, Modal } from 'antd'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import Cards from './Cards/Cards'
import Loading from '../common/Loader'
import { useActions } from '@/hooks/actions'
import FormCreateEntry from '../Home/Content/ModalCreateEntry/FormCreateEntry/FormCreateEntry'
import moment from 'moment'
import dynamic from 'next/dynamic'

const Day: FC = () => {
    const { entries, currentDay, isFetching, isModalOpen } = useAppSelector(state => state.entries)
    const { users } = useAppSelector(state => state.login)
    const { getEntriesFetch, setIsFetching, setIsModalOpen, setIsNew } = useActions()

    const onOpenModal = () => setIsModalOpen(true)
    const onCloseModal = () => setIsModalOpen(false) && setIsNew(true)

    const formattedDate = `${moment(currentDay).format('dddd')}, ${moment(currentDay).format('ll')}`

    useEffect(() => {
        getEntriesFetch()
        setIsFetching(false)
    }, [isFetching])

    return (
        <>
            <Header />
            {/* <div className='bg-slate-50 min-h-[100vh]'> */}
            <div className='bg-slate-50 min-h-[calc(100vh-64px)]'>
                <p className='capitalize text-center pt-5 text-2xl '>{formattedDate}</p>
                <div className=' flex flex-col justify-center items-center p-5'>
                    <Cards entries={entries} users={users} />
                    <Button className='mt-5' type='primary' onClick={onOpenModal}>
                        Добавить
                    </Button>
                    <Modal
                        title='Создание Записи'
                        open={isModalOpen}
                        // onOk={handleOk}
                        onCancel={onCloseModal}
                        footer={null}
                        centered
                    >
                        <FormCreateEntry currentDay={currentDay} />
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default dynamic(() => Promise.resolve(Day), { ssr: false })
