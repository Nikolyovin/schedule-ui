import { useActions } from '@/hooks/actions'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import React, { FC } from 'react'

interface IProps {
    entryId: string
}

const ButtonsCard: FC<IProps> = ({ entryId }) => {
    const { removeEntryFetch, setIsFetching, setIsModalOpen, setUpdateEntryId, setIsNew } = useActions()

    const onConfirm: () => void = () => {
        removeEntryFetch(entryId)
        setIsFetching(true)
    }

    const onEditEntry: () => void = () => {
        setIsModalOpen(true)
        setUpdateEntryId(entryId)
        setIsNew(false)
    }

    return (
        <div className='absolute top-3 right-3'>
            <Button onClick={onEditEntry} size='small' type='default' className='mr-1' icon={<EditOutlined />} />
            <Popconfirm
                title='Удалить эту запись?'
                description='Вы действительно хотите удалить эту запись?'
                onConfirm={onConfirm}
                // onCancel={}
                okText='Да'
                cancelText='Нет'
            >
                <Button size='small' type='default' icon={<CloseOutlined />} />
            </Popconfirm>
        </div>
    )
}

export default ButtonsCard
