import { Button, Calendar, Layout, Modal } from 'antd'
import React, { useState } from 'react'
import FormCreateEntry from './ModalCreateEntry/FormCreateEntry/FormCreateEntry'

const Content = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Layout.Content style={{ padding: '0 20px' }}>
      <Calendar />
      <div className='my-3 text-center'>
        <Button type='primary' onClick={showModal}>
          Создать
        </Button>
      </div>
      <Modal
        // title='Basic Modal'
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <FormCreateEntry />
      </Modal>
    </Layout.Content>
  )
}

export default Content
