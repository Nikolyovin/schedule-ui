import { Spin } from 'antd'

const Loading = () => {
  return (
    <div className='m-auto'>
      <Spin size='large' tip='Loading...' />
    </div>
  )
}

export default Loading
