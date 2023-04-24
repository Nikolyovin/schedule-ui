import { Button, Calendar, Layout } from 'antd'
import React from 'react'

const Content = () => {
  return (
    <Layout.Content style={{ padding: '0 20px' }}>
      <Calendar />
      <div className='my-3 text-center'>
        <Button type='default'>Создать</Button>
      </div>
    </Layout.Content>
  )
}

export default Content
