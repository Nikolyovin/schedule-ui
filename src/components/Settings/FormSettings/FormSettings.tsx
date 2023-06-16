import React, { FC, useEffect, useState } from 'react'
import { LockOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
// import { COLORS } from '@/common'
import { ColorPicker } from 'antd'
import { Button, Card, Form, Input, Row, Select, Spin } from 'antd'
import { IUpdateUser, IUser } from '@/models/models'
import { Color } from 'antd/es/color-picker'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/hooks/redux'
import { useActions } from '@/hooks/actions'

interface IProps {
    activeUser: IUser
}

const FormSettings: FC<IProps> = ({ activeUser }) => {
    const [color, setColor] = useState<Color | string>(activeUser.color)
    const { isLoading } = useAppSelector(state => state.settings)
    const { users } = useAppSelector(state => state.login)
    const { updateUserFetch, getUsersFetch, setActiveUser } = useActions()

    const onFinish: (values: IUpdateUser) => void = values => {
        const colorHex = typeof values.color === 'string' ? values.color : values.color.toHexString()
        updateUserFetch({ ...values, color: colorHex, userId: activeUser._id })
    }

    return (
        <Spin spinning={isLoading} tip='Loading' size='large'>
            <Form
                onFinish={onFinish}
                name='registration'
                // style={{ height: 190 }}
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                layout='vertical'
            >
                <Form.Item
                    label='Логин'
                    name='login'
                    initialValue={activeUser.login}
                    rules={[{ required: true, message: 'Пожалуйста введите свой логин!' }]}
                    labelAlign={'left'}
                >
                    <Input
                        autoComplete='off'
                        prefix={<UserOutlined className='site-form-item-icon' />}
                        placeholder='Логин'
                        size='large'
                    />
                </Form.Item>

                <Form.Item
                    label='Имя'
                    name='name'
                    initialValue={activeUser.name}
                    rules={[{ required: true, message: 'Пожалуйста укажите своё имя!' }]}
                >
                    <Input
                        autoComplete='off'
                        prefix={<UserOutlined className='site-form-item-icon' />}
                        placeholder='Имя'
                        size='large'
                    />
                </Form.Item>

                <Form.Item
                    label='Пароль'
                    name='password'
                    initialValue={activeUser.password}
                    rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                >
                    <Input.Password
                        autoComplete='off'
                        prefix={<LockOutlined className='site-form-item-icon' />}
                        placeholder='Пароль'
                        size='large'
                    />
                </Form.Item>
                <Form.Item
                    label='Цвет'
                    name='color'
                    initialValue={color}

                    // rules={[{ message: 'Пожалуйста выберите цвет!' }]}
                >
                    <ColorPicker
                        onChange={setColor}
                        value={color}
                        // format='hex'
                        // showValue
                        // defaultValue={color}
                        // defaultValue={activeUser.color}
                    />
                </Form.Item>

                <Row justify={'center'}>
                    <Form.Item wrapperCol={{ span: 18 }}>
                        <Button type='primary' htmlType='submit'>
                            Сохранить
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </Spin>
    )
}

// export default FormSettings
export default dynamic(() => Promise.resolve(FormSettings), { ssr: false })
