import { useActions } from '@/hooks/actions'
import { IEntry } from '@/models/models'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import React, { FC } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faInstagram, faVk, faTelegram } from '@fortawesome/free-brands-svg-icons'

interface IProps {
    entry: IEntry
}

const ButtonsCard: FC<IProps> = ({ entry }) => {
    const { removeEntryFetch, setIsFetching, setIsModalOpen, setUpdateEntry, setIsNew } = useActions()

    const onConfirm: () => void = () => {
        removeEntryFetch(entry._id)
        setIsFetching(true)
    }

    const onEditEntry: () => void = () => {
        setUpdateEntry(entry)
        setIsNew(false)
        setIsModalOpen(true)
    }

    return (
        <div className='absolute top-3 right-3'>
            {/* <FontAwesomeIcon icon={faTelegram} size='xl' /> */}
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
