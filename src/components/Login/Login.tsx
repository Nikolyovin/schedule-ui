import { Card } from 'antd'
import React, { FC } from 'react'
import LoginForm from './LoginForm/LoginForm'
import { useAppSelector } from '@/hooks/redux'
import NotificationApp from '../common/NotificationApp'

const Login: FC = () => {
    const { isLoading } = useAppSelector(state => state.login)
    return (
        <div className='mobile-background h-[100vh] w-[100%] flex justify-center  items-center md:bg-slate-50'>
            {/* <NotificationApp /> */}
            <Card title={'Вход'}>
                <LoginForm />
            </Card>
        </div>
    )
}

export default Login
