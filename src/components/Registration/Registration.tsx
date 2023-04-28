import React from 'react'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import { Card } from 'antd'

const Registration = () => {
  return (
    <div className=' h-[100vh] w-[100%] flex justify-center  items-center bg-slate-50'>
      <Card title='Регистрация'>
        <RegistrationForm />
      </Card>
    </div>
  )
}

export default Registration
