import { Card } from 'antd'
import React, { FC } from 'react'
import LoginForm from './LoginForm/LoginForm'
import { useAppSelector } from '@/hooks/redux'

const Login: FC = () => {
  const { isLoading } = useAppSelector((state) => state.login)
  return (
    <div className=' h-[100vh] w-[100%] flex justify-center  items-center  bg-slate-50'>
      <Card title={'Вход'}>
        <LoginForm />
      </Card>
    </div>
  )
}

export default Login
