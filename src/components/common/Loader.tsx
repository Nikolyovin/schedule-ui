import { Spin } from 'antd'
import { FC } from 'react'

const Loading:FC = ({child}) => {
  return (
    <div className='min-h-[calc(100vh-var(--header-height))] flex justify-center items-center'>
      <Spin size='large' tip='Loading...' >{child}</Spin>
    </div>
  )
}

export default Loading
