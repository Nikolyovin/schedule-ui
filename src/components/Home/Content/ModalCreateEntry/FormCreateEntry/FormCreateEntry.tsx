import { Button, DatePicker, Form, Input, InputNumber, Row, TimePicker } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { ICreateEntry, IEntry } from '@/models/models'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import dayjs from 'dayjs'

interface IProps {
    currentDay: Date | null
}

const FormCreateEntry: FC<IProps> = ({ currentDay }) => {
    const { createEntryFetch, setIsFetching, updateEntryFetch, setIsNew, setUpdateEntry } = useActions()
    const { activeUser } = useAppSelector(state => state.login)
    const { isNew, updateEntry } = useAppSelector(state => state.entries)

    const [form] = Form.useForm()

    const clearForm: () => void = () => {
        setIsFetching(true)
        form.resetFields()
        setUpdateEntry({} as IEntry)
        setIsNew(true)
    }

    useEffect(() => {
        form.resetFields()
    }, [updateEntry])

    const onFinish = (values: ICreateEntry) => {
        isNew
            ? createEntryFetch({ ...values, master: activeUser._id })
            : updateEntryFetch({ ...values, master: activeUser._id, updateEntryId: updateEntry._id })
        clearForm()
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
                initialValue={updateEntry.clientName}
                label='Имя клиента'
                name='clientName'
                rules={[{ required: true, message: 'Пожалуйста укажите имя клиента!' }]}
            >
                <Input autoComplete='off' placeholder='Имя клиента' />
            </Form.Item>

            <Form.Item
                label='Дата сеанса'
                name='date'
                initialValue={currentDay ? dayjs(currentDay) : null}
                rules={[{ required: true, message: 'Укажите дату сеанса!' }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                label='Время сеанса'
                name='time'
                rules={[{ required: true, message: 'Укажите время сеанса!' }]}
                initialValue={!isNew ? dayjs(updateEntry.time) : null}
            >
                <TimePicker />
            </Form.Item>

            <Form.Item
                label='Длительность:'
                name='duration'
                initialValue={updateEntry.duration}
                rules={[{ required: true, message: 'Укажите продолжительность часов!' }]}
            >
                <InputNumber placeholder='в часах' min={1} max={12} />
            </Form.Item>

            <Form.Item label='Описание' name='description' initialValue={updateEntry.description}>
                <TextArea placeholder='Описание' />
            </Form.Item>
            <Row justify={'center'}>
                <Form.Item>
                    {isNew ? (
                        <Button type='primary' htmlType='submit'>
                            Создать
                        </Button>
                    ) : (
                        <Button type='primary' htmlType='submit'>
                            Изменить
                        </Button>
                    )}
                </Form.Item>
            </Row>
        </Form>
    )
}

export default FormCreateEntry
