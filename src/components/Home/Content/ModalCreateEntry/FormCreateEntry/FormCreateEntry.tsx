import { Button, DatePicker, Form, Input, InputNumber, Row, TimePicker } from 'antd'
import React, { FC } from 'react'
import { ICreateEntry } from '@/models/models'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import dayjs from 'dayjs'

interface IProps {
    currentDay: Date | null
}

const FormCreateEntry: FC<IProps> = ({ currentDay }) => {
    const { createEntryFetch, setIsFetching } = useActions()
    const { activeUser } = useAppSelector(state => state.login)

    console.log('fay:', currentDay)

    const [form] = Form.useForm()

    const onFinish = (values: ICreateEntry) => {
        createEntryFetch({ ...values, master: activeUser._id })
        setIsFetching(true)
        form.resetFields()
    }

    const { TextArea } = Input

    return (
        <Form
            onFinish={onFinish}
            name='login'
            style={{ maxWidth: 1200 }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
        >
            <Form.Item
                label='Имя клиента'
                name='clientName'
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
                initialValue={currentDay ? dayjs(currentDay) : null}
                rules={[{ required: true, message: 'Укажите дату сеанса!' }]}
            >
                {/* {props.currentDay ? <DatePicker ={dayjs(props.currentDay)} /> : <DatePicker />} */}
                <DatePicker />
            </Form.Item>
            <Form.Item label='Время сеанса' name='time' rules={[{ required: true, message: 'Укажите время сеанса!' }]}>
                <TimePicker />
            </Form.Item>

            <Form.Item
                label='Длительность:'
                name='duration'
                rules={[{ required: true, message: 'Укажите продолжительность часов!' }]}
            >
                <InputNumber placeholder='в часах' min={1} max={12} />
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
