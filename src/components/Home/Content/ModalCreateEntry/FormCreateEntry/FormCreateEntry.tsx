import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  TimePicker,
} from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const FormCreateEntry = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const { RangePicker } = DatePicker
  const { TextArea } = Input

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
        label='Дата сеанса'
        name='date'
        rules={[{ required: true, message: 'Укажите дату сеанса!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label='Время сеанса'
        name='time'
        rules={[{ required: true, message: 'Укажите время сеанса!' }]}
      >
        <TimePicker />
      </Form.Item>

      <Form.Item
        label='Продолжительность'
        name='duration'
        rules={[
          { required: true, message: 'Укажите продолжительность часов!' },
        ]}
      >
        <InputNumber min={1} max={12} />
      </Form.Item>

      <Form.Item
        label='Описание'
        name='description'
        // rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
      >
        <TextArea
          // autoComplete='off'
          placeholder='Описание'
        />
      </Form.Item>
      <Row justify={'center'}>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default FormCreateEntry
