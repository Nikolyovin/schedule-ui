import { Layout, Typography } from 'antd'
import React from 'react'

const Header = () => {
  return (
    <Layout.Header>
      <div className='flex justify-between items-center h-full'>
        <div className='bg-slate-300 bordeer rounded-full w-10 h-10 '></div>
        <span className='text-white text-lg'>Имя пользователя</span>
        <div className='bg-slate-300 bordeer rounded-full w-10 h-10 '></div>
      </div>
    </Layout.Header>
  )
}

export default Header
