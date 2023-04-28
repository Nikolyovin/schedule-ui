import { COLORS } from '@/common'
import { IRegistrationForm } from '@/models/models'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Row, Select } from 'antd'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

const RegistrationForm: FC = () => {
  const [color, setColor] = useState<string | null>()
  const router = useRouter()

  const onFinish = (values: IRegistrationForm) => {
    console.log('Success:', { ...values, color })
    router.push({
      pathname: '/login',
    })
  }
  console.log('color:', color)
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
    setColor(value)
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
        label='Логин'
        name='login'
        rules={[{ required: true, message: 'Пожалуйста введите свой логин!' }]}
      >
        <Input
          autoComplete='off'
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Логин'
        />
      </Form.Item>

      <Form.Item
        label='Имя'
        name='firstName'
        rules={[{ required: true, message: 'Пожалуйста укажите своё имя!' }]}
      >
        <Input
          autoComplete='off'
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Имя'
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

      {/* <div className='w-full flex items-center'>
        <Form.Item
          label='Цвет'
          name='color'
          rules={[{ required: true, message: 'Пожалуйста выберите цвет!' }]}
        >
          <Select
            value={color}
            onChange={handleChange}
            options={COLORS}
            style={
              color
                ? { color: color, width: 200 }
                : { backgroundColor: 'white', width: 120 }
            }
          />
        </Form.Item>
        <div
          className='rounded-full w-[20px] h-[20px] ml-2 justify-center'
          style={
            color ? { backgroundColor: color } : { backgroundColor: 'white' }
          }
        ></div>
      </div> */}

      <Form.Item
        label='Цвет'
        name='color'
        rules={[{ message: 'Пожалуйста выберите цвет!' }]}
      >
        <div className='flex items-center'>
          <Select
            value={color}
            onChange={handleChange}
            options={COLORS}
            style={{ width: '83%' }}
            //     : { backgroundColor: 'white', width: 120 }
            // }
          />
          <div
            className='rounded-full w-[25px] h-[25px] ml-2 justify-center'
            style={
              color ? { backgroundColor: color } : { backgroundColor: 'white' }
            }
          ></div>
        </div>
      </Form.Item>

      <Row justify={'center'}>
        <Form.Item wrapperCol={{ span: 18 }}>
          <Button type='primary' htmlType='submit'>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default RegistrationForm
