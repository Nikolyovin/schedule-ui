import { Button, Calendar, Layout, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import FormCreateEntry from './ModalCreateEntry/FormCreateEntry/FormCreateEntry'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import CalendarAll from './CalendarAll/CalendarAll'
import NotificationApp from '@/components/common/NotificationApp'

const Content = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false)
    const { setIsModalOpen } = useActions()
    const { isModalOpen } = useAppSelector(state => state.entries)

    const showModal = () => {
        setIsModalOpen(true)
    }

    // const handleOk = () => {
    //   setIsModalOpen(false)
    // }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <Layout.Content style={{ padding: '0 20px', height: '100vh' }}>
            <NotificationApp />
            <CalendarAll />
            <div className='my-3 text-center'>
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
        </Layout.Content>
    )
}

export default Content
