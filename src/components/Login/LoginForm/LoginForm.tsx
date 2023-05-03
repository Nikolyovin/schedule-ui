import { Button, Form, Input, Row, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ILoginForm } from '@/models/models'
import { useAppSelector } from '@/hooks/redux'
import { useActions } from '@/hooks/actions'

const LoginForm: FC = () => {
  const router = useRouter()
  const [error, setError] = useState<boolean>(false)

  const { users, isLoading } = useAppSelector((state) => state.login)

  const { getUsersFetch, setActiveUser } = useActions()

  useEffect(() => {
    getUsersFetch()
  }, [])

  const onFinish = (values: ILoginForm) => {
    if (!isLoading && users.length > 0) {
      console.log('users:', users)
      const login = users.find(
        (user) =>
          user.login === values.username && user.password === values.password
      )
      console.log('login:', login)
      if (!login) setError(true)
      if (login) {
        setActiveUser(login)
        setError(false)
        router.push({
          pathname: '/',
        })
      }
    }
  }

  return (
    <Spin spinning={isLoading} tip='Loading' size='large'>
      <Form
        onFinish={onFinish}
        name='login'
        style={{ maxWidth: 1200, marginBottom: 0 }}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        {error && (
          <span className='flex justify-center text-red-500 '>
            Неверный логин или пароль!
          </span>
        )}
        <Form.Item
          label='Логин'
          name='username'
          rules={[
            { required: true, message: 'Пожалуйста введите свой логин!' },
          ]}
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
              // onClick={() => {
              //   router.push({
              //     pathname: '/',
              //   })
              // }}
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
    </Spin>
  )
}

export default LoginForm
