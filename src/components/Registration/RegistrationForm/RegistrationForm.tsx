import { COLORS } from '@/common'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import { IRegistrationForm } from '@/models/models'
import { LockOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Row, Select, Upload } from 'antd'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

const RegistrationForm: FC = () => {
  const [color, setColor] = useState<string>('white')
  const { createUserFetch } = useActions()
  const {} = useAppSelector((state) => state.registration)
  const router = useRouter()

  const onFinish = (values: IRegistrationForm) => {
    console.log('Success:', { ...values, color })
    createUserFetch({ ...values, color })

    // router.push({
    //   pathname: '/login',
    // })
  }
  const handleChange = (value: string) => {
    setColor(value)
  }

  //need for upload
  // const getFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e
  //   }
  //   return e && e.fileList
  // }

  return (
    <Form
      onFinish={onFinish}
      name='registration'
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
        name='name'
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

      <Form.Item
        label='Аватар'
        name='picture'
        // valuePropName='fileList'
        // getValueFromEvent={getFile}
        // rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
      >
        <Upload maxCount={1} listType={'picture'} withCredentials>
          <Button icon={<UploadOutlined />}>Click</Button>
        </Upload>
        {/* <input type='file' name='picture' /> */}
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
