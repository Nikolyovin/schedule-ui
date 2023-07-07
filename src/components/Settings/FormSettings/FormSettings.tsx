import React, { FC, useEffect, useState } from 'react'
import { LockOutlined, SmileOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
// import { COLORS } from '@/common'
import { ColorPicker, notification } from 'antd'
import { Button, Card, Form, Input, Row, Select, Spin } from 'antd'
import { IUpdateUser, IUser, NotificationType } from '@/models/models'
import { Color } from 'antd/es/color-picker'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/hooks/redux'
import { useActions } from '@/hooks/actions'
import ColorPickerForm from '@/components/common/ColorPickerForm'
import NotificationApp from '@/components/common/NotificationApp'
import { NotificDescrip, NotificMes, NotificType } from '@/common'

interface IProps {
    activeUser: IUser
}

const FormSettings: FC<IProps> = ({ activeUser }) => {
    const [color, setColor] = useState<Color | string>(activeUser.color)
    const { isLoading } = useAppSelector(state => state.settings)
    const { setNotificationData, setIsShowNotification, updateUserFetch } = useActions()

    const notificationData = {
        type: NotificType.INFO,
        message: NotificMes.INFO,
        description: NotificDescrip.UPDATE_USER_INFO
    }

    const onFinish: (values: IUpdateUser) => void = values => {
        const colorHex = typeof values.color === 'string' ? values.color : values.color.toHexString()
        const loginLow = values.login.toLocaleLowerCase()

        const isNotUpdate =
            values.name === activeUser.name &&
            values.login === activeUser.login &&
            colorHex === activeUser.color &&
            values.password === activeUser.password

        isNotUpdate
            ? setNotificationData(notificationData) && setIsShowNotification(true)
            : updateUserFetch({ ...values, color: colorHex, login: loginLow, userId: activeUser._id })
    }

    return (
        <Spin spinning={isLoading} tip='Loading' size='large'>
            {/* {contextHolder} */}
            <NotificationApp />
            <Form onFinish={onFinish} name='registration' layout='vertical'>
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

                <ColorPickerForm color={color} setColor={setColor} />

                <Row justify={'center'}>
                    <Form.Item wrapperCol={{ span: 18 }}>
                        <Button type='primary' style={{ backgroundColor: '#001529' }} htmlType='submit'>
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
