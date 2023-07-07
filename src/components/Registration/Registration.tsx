import React from 'react'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import { Card } from 'antd'

const Registration = () => {
    return (
        <div className='mobile-background h-[100vh] w-[100%] flex justify-center  items-center md:bg-slate-50'>
            <Card title='Регистрация' className='opacity-90'>
                <RegistrationForm />
            </Card>
        </div>
    )
}

export default Registration
