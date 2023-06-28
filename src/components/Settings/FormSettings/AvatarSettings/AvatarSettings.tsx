import TheAvatar from '@/components/common/TheAvatar'
import { useActions } from '@/hooks/actions'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { FC, MutableRefObject, useRef } from 'react'

interface IProps {
    activeUserId: string
}

const AvatarSettings: FC<IProps> = ({ activeUserId }) => {
    const { updateAvatarUserFetch } = useActions()
    const filePicker = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>

    const handlePick = () => {
        filePicker.current.click()
    }

    const handleUpload = (e: any) => {
        // const file: File = e.target.files[0]
        // React.FormEvent<HTMLInputElement> не успокоил ts  пришлось any
        updateAvatarUserFetch({ userId: activeUserId, picture: e.target.files[0] })
    }
    return (
        <>
            <div className='flex justify-center mb-5 items-end'>
                <TheAvatar size={200} />
                <Button type='primary' onClick={handlePick} shape='circle' icon={<EditOutlined />} />
            </div>
            <input
                ref={filePicker}
                type='file'
                onChange={handleUpload}
                accept='image/*,.png,.jpg,.gif,.web'
                className='opacity-0 w-0 h-0 leading-[0px] overflow-hidden p-0 m-0 '
            />
        </>
    )
}

export default AvatarSettings
