import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

const LoginForm = () => {
  const router = useRouter()
  return (
    <Form
      name='login'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      //   style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      //   onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      //   autoComplete='off'
    >
      <Form.Item
        label='Логин'
        name='username'
        rules={[{ required: true, message: 'Пожалуйста введите свой логин!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Пароль'
        name='password'
        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type='default'
          onClick={() => {
            router.push({
              pathname: '/',
              //   query: { pid: post.id },
            })
          }}
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
