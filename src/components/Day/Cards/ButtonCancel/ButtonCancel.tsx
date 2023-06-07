import { useActions } from '@/hooks/actions'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import React, { FC } from 'react'

interface IProps {
    entryId: string
}

const ButtonCancel: FC<IProps> = ({ entryId }) => {
    const { removeEntryFetch, setIsFetching } = useActions()

    const onConfirm: () => void = () => {
        removeEntryFetch(entryId)
        setIsFetching(true)
    }

    return (
        <Popconfirm
            title='Удалить эту запись?'
            description='Вы действительно хотите удалить эту запись?'
            onConfirm={onConfirm}
            // onCancel={}
            okText='Да'
            cancelText='Нет'
        >
            <Button size='small' className='absolute top-3 right-3' type='default' icon={<CloseOutlined />} />
        </Popconfirm>
    )
}

export default ButtonCancel
