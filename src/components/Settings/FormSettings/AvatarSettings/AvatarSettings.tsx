import TheAvatar from '@/components/common/TheAvatar'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import { useWindowSize } from '@/hooks/windowSize'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { FC, MutableRefObject, useRef } from 'react'

interface IProps {
    activeUserId: string
}

const AvatarSettings: FC<IProps> = ({ activeUserId }) => {
    const {activeUser} = useAppSelector(state => state.login)
    const { updateAvatarUserFetch } = useActions()
    const filePicker = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
    const { width } = useWindowSize()

    const lgMinScreen = width <= 1281

    const handlePick = () => {
        filePicker.current.click()
    }

    const handleUpload = (e: any) => {
        // React.FormEvent<HTMLInputElement> не успокоил ts  пришлось any
        updateAvatarUserFetch({ userId: activeUserId, picture: e.target.files[0] })
    }

    return (
        <>
            <div className='flex justify-center 2xl:mb-5 items-end'>
                <TheAvatar size={lgMinScreen ? 100 : 200} picture={activeUser.picture}/>
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
