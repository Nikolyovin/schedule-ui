import { Button, Calendar, Layout, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import FormCreateEntry from '../../common/FormCreateEntry'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import CalendarAll from './CalendarAll/CalendarAll'
import NotificationApp from '@/components/common/NotificationApp'

const Content = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false)
    const { setIsModalOpen } = useActions()
    const { isModalOpen } = useAppSelector(state => state.entries)

    const showModal = () => setIsModalOpen(true)

    // const handleOk = () => {
    //   setIsModalOpen(false)
    // }

    const handleCancel = () => setIsModalOpen(false)

    const calcHeight = `calc(100vh-64px)`
    // min-h-[calc(100vh-64px)]
    return (
        // <Layout.Content style={{ padding: '0 100px', minHeight: calcHeight }}>
        <div className='2xl:px-[100px] xl:px-[40px] md:px-[10px] px-0  md:pt-3 min-h-[calc(100vh-var(--header-height))]'>
            <NotificationApp />
            <CalendarAll />
            <div className='text-center absolute bottom-3 z-10 left-[50%] -translate-x-1/2 '>
                <Button type='primary' onClick={showModal}>
                    Создать
                </Button>
            </div>
            <Modal
                title='Создание Записи'
                open={isModalOpen}
                // onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                centered
            >
                <FormCreateEntry currentDay={null} />
            </Modal>
        </div>
        // </div>
    )
}

export default Content
