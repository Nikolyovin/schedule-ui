import { Button, Form, Input, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const FormCreateEntry = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  return (
    <Form
      onFinish={onFinish}
      name='login'
      style={{ maxWidth: 1200 }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label='Имя клиента'
        name='client name'
        rules={[{ required: true, message: 'Пожалуйста укажите имя клиента!' }]}
      >
        <Input
          autoComplete='off'
          // prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Имя клиента'
        />
      </Form.Item>

      <Form.Item
        label='Описание'
        name='description'
        // rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
      >
        <Input.Password
          autoComplete='off'
          // prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Описание'
        />
      </Form.Item>
    </Form>
  )
}

export default FormCreateEntry
