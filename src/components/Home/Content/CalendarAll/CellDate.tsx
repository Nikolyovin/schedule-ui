import React, { FC } from 'react'

interface IProps {
  masterName: string
  color: string
  duration: number
  id: string
}

const CellDate: FC<IProps> = ({ masterName, color, duration, id }) => {
  return (
    <div className='flex items-center justify-start' key={id}>
      <div
        style={{ backgroundColor: color }}
        className='rounded-full w-3 h-3 mr-2'
      ></div>
      <span>
        {masterName}: {duration} ч.
      </span>
    </div>
  )
}

export default CellDate
