import { useWindowSize } from '@/hooks/windowSize'
import React, { FC, useEffect, useState } from 'react'

interface IProps {
    masterName: string
    color: string
    duration: number
    id: string
}

const CellDate: FC<IProps> = ({ masterName, color, duration, id }) => {
    const { width } = useWindowSize()

    const smScreen = width <= 641
    const mdScreen = 641 < width && width <= 1025
    const lgScreen = 1025 < width && width <= 1281
    const xlScreen = width > 1281

    return (
        <div className='flex items-center flex-nowrap justify-start '>
            <div
                style={{ backgroundColor: color }}
                className='rounded-full lg:w-3 lg:h-3 w-2 h-2 md:mr-2 mr-[1px]'
            ></div>

            {xlScreen && (
                <span>
                    {masterName}: {duration} ч.
                </span>
            )}
            {lgScreen && masterName && (
                <span>
                    {masterName.length > 10 ? (
                        <>
                            {masterName.slice(0, 8)}... {duration} ч.
                        </>
                    ) : (
                        <>
                            {masterName} : {duration} ч.
                        </>
                    )}
                </span>
            )}
            {mdScreen && masterName && (
                <span>
                    {masterName.slice(0, 3)}... {duration} ч.
                </span>
            )}

            {smScreen && masterName && <span>{masterName.slice(0, 1)}</span>}
        </div>
    )
}

export default CellDate
