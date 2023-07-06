import { Button, DatePicker, Form, Input, InputNumber, Radio, Rate, Row, TimePicker } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { ICreateEntry, IEntry } from '@/models/models'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import dayjs from 'dayjs'
import { NotificDescrip, NotificMes, NotificType, RateValue } from '@/common'
import 'dayjs/locale/ru'
import locale from 'antd/lib/date-picker/locale/ru_RU.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faVk, faTelegram } from '@fortawesome/free-brands-svg-icons'

interface IProps {
    currentDay: Date | null
}

const FormCreateEntry: FC<IProps> = ({ currentDay }) => {
    const {
        createEntryFetch,
        setIsFetching,
        updateEntryFetch,
        setIsNew,
        setUpdateEntry,
        setNotificationData,
        setIsShowNotification
    } = useActions()

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

    const notificationData = {
        type: NotificType.INFO,
        message: NotificMes.INFO,
        description: NotificDescrip.UPDATE_USER_INFO
    }
    const onFinish = (values: ICreateEntry) => {
        console.log('values:', values)

        const isNotUpdate =
            values.clientName === updateEntry.clientName &&
            dayjs(values.date).format('DD/MM/YYYY') === dayjs(updateEntry.date).format('DD/MM/YYYY') &&
            values.description === updateEntry.description &&
            dayjs(values.time).toString() === dayjs(updateEntry.time).toString() &&
            values.duration === updateEntry.duration &&
            values.wherefrom === updateEntry.wherefrom

        !isNotUpdate
            ? isNew
                ? createEntryFetch({ ...values, master: activeUser._id }) && clearForm()
                : updateEntryFetch({ ...values, master: activeUser._id, updateEntryId: updateEntry._id }) && clearForm()
            : setNotificationData(notificationData) && setIsShowNotification(true)
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
                <DatePicker locale={locale} inputReadOnly />
            </Form.Item>
            <Form.Item
                label='Время сеанса'
                name='time'
                rules={[{ required: true, message: 'Укажите время сеанса!' }]}
                initialValue={!isNew ? dayjs(updateEntry.time) : null}
            >
                <TimePicker locale={locale} format={'HH:mm'} changeOnBlur inputReadOnly />
            </Form.Item>

            <Form.Item
                label='Длительность:'
                name='duration'
                initialValue={updateEntry.duration}
                rules={[{ required: true, message: 'Укажите продолжительность часов!' }]}
            >
                <InputNumber type='number' placeholder='в часах' min={1} max={12} controls keyboard />
            </Form.Item>

            <Form.Item
                label='Откуда:'
                name='wherefrom'
                rules={[{ required: true, message: 'Выберете одно из' }]}
                initialValue={updateEntry.wherefrom}
            >
                <Radio.Group buttonStyle='solid'>
                    <Radio.Button value={RateValue.instagram}>
                        <FontAwesomeIcon icon={faInstagram} size='xl' />
                    </Radio.Button>
                    <Radio.Button value={RateValue.vkontakte}>
                        <FontAwesomeIcon icon={faVk} size='xl' />
                    </Radio.Button>
                    <Radio.Button value={RateValue.telegram}>
                        <FontAwesomeIcon icon={faTelegram} size='xl' />
                    </Radio.Button>
                    <Radio.Button value={RateValue.other}>Другое</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                label='Описание'
                name='description'
                rules={[{ required: true, message: 'Пожалуйста заполните поле!' }]}
                initialValue={updateEntry.description}
            >
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
