import Header from '@/components/Home/Header/Header'
import RegistrationForm from '@/components/Registration/RegistrationForm/RegistrationForm'
import { useAppSelector } from '@/hooks/redux'
import { Button, Card, Dropdown, Form, Input, Row, Select, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { MutableRefObject, useEffect, useRef } from 'react'
import FormSettings from './FormSettings/FormSettings'
import AvatarSettings from './FormSettings/AvatarSettings/AvatarSettings'

const Settings = () => {
    const { activeUser } = useAppSelector(state => state.login)
    const router = useRouter()

    useEffect(() => {
        if (Object.keys(activeUser).length === 0) {
            router.push({
                pathname: '/login'
            })
        }
    }, [activeUser])

    return (
        <>
            <Header />
            <div className='min-h-[calc(100vh-64px)] w-[100%] flex justify-center  bg-slate-50'>
                <Card title='Мои настройки' style={{ width: 700, maxHeight: 750, marginTop: 50 }}>
                    {/* <Dropdown> */}
                    <AvatarSettings activeUserId={activeUser._id} />
                    {/* <Button type='primary' shape='circle' icon={<EditOutlined />} /> */}
                    {/* </Dropdown> */}
                    <FormSettings activeUser={activeUser} />
                </Card>
            </div>
        </>
    )
}

export default Settings
