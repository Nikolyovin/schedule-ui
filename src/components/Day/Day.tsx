import Header from '@/components/Home/Header/Header'
import { useAppSelector } from '@/hooks/redux'
import { Button, Modal } from 'antd'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import Cards from './Cards/Cards'
import { useActions } from '@/hooks/actions'
import FormCreateEntry from '../Home/Content/ModalCreateEntry/FormCreateEntry/FormCreateEntry'
import moment from 'moment'
import dynamic from 'next/dynamic'
import { IEntry } from '@/models/models'
import NotificationApp from '../common/NotificationApp'

const Day: FC = () => {
    const { entries, currentDay, isFetching, isModalOpen } = useAppSelector(state => state.entries)
    const { users, activeUser } = useAppSelector(state => state.login)
    const { getEntriesFetch, setIsFetching, setIsModalOpen, setIsNew, setUpdateEntry } = useActions()
    const router = useRouter()

    useEffect(() => {
        if (Object.keys(activeUser).length === 0) {
            router.push({
                pathname: '/login'
            })
        }
    }, [activeUser])

    const onOpenModal = () => setIsModalOpen(true)
    const onCloseModal = () => {
        setIsModalOpen(false)
        setIsNew(true)
        setUpdateEntry({} as IEntry)
    }

    const formattedDate = `${moment(currentDay).format('dddd')}, ${moment(currentDay).format('ll')}`

    useEffect(() => {
        getEntriesFetch()
        setIsFetching(false)
    }, [isFetching])

    return (
        <>
            <Header />
            <div className='bg-slate-50 min-h-[calc(100vh-64px)]'>
                <NotificationApp />
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
