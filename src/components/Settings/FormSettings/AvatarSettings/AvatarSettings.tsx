import TheAvatar from '@/components/common/TheAvatar'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { MutableRefObject, useRef } from 'react'

const AvatarSettings = () => {
    const filePicker = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>

    const handlePick = () => {
        filePicker.current.click()
    }

    const handleUpload = (e: any) => {
        // React.FormEvent<HTMLInputElement> не успокоил ts  пришлось any
        // setImg(e.target.files[0])
        console.log('img', e.target.files[0])
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
                // defaultValue={defaultImg}
                accept='image/*,.png,.jpg,.gif,.web'
                className='opacity-0 w-0 h-0 leading-[0px] overflow-hidden p-0 m-0 '
            />
        </>
    )
}

export default AvatarSettings
