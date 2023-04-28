import { Button, Form, Input, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ILoginForm } from '@/models/models'

const LoginForm = () => {
  const router = useRouter()

  const onFinish = (values: ILoginForm) => {
    console.log('Success:', values)
  }

  return (
    <Form
      onFinish={onFinish}
      name='login'
      style={{ maxWidth: 1200, marginBottom: 0 }}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label='Логин'
        name='username'
        rules={[{ required: true, message: 'Пожалуйста введите свой логин!' }]}
      >
        <Input
          autoComplete='off'
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Логин'
        />
      </Form.Item>

      <Form.Item
        label='Пароль'
        name='password'
        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
      >
        <Input.Password
          autoComplete='off'
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder='Пароль'
        />
      </Form.Item>

      <Row justify={'center'}>
        <Form.Item wrapperCol={{ span: 18 }}>
          <Button
            type='primary'
            htmlType='submit'
            onClick={() => {
              router.push({
                pathname: '/',
              })
            }}
          >
            Войти
          </Button>
        </Form.Item>
      </Row>
      <Row justify={'center'}>
        <Form.Item wrapperCol={{ span: 18 }}>
          <Button
            type='link'
            htmlType='button'
            onClick={() => {
              router.push({
                pathname: '/registration',
              })
            }}
          >
            зарегистрироваться
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default LoginForm
