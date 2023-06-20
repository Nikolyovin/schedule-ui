import { COLORS } from '@/common'
import { useActions } from '@/hooks/actions'
import { useAppSelector } from '@/hooks/redux'
import { IRegistrationForm } from '@/models/models'
import { LockOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Row, Select, Spin } from 'antd'
import { useRouter } from 'next/router'
import { ChangeEvent, ChangeEventHandler, FC, MutableRefObject, useEffect, useRef, useState } from 'react'

//в useState сделать дефолтный аватар

const RegistrationForm: FC = () => {
    const [color, setColor] = useState<string>('white')
    const [img, setImg] = useState<File | null>(null)
    const [text, setText] = useState<string>('')

    const { createUserFetch, getUsersFetch } = useActions()

    const { isLoading, isPush } = useAppSelector(state => state.registration)
    const { users } = useAppSelector(state => state.login)

    const router = useRouter()

    const filePicker = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>

    useEffect(() => {
        if (isPush) {
            router.push({
                pathname: '/login'
            })
        }
    }, [isPush])

    const onFinish = (values: IRegistrationForm) => {
        createUserFetch({ ...values, color, picture: img })
    }

    const onChangeInputLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleChange = (value: string) => setColor(value)

    const handleUpload = (e: any) => {
        // React.FormEvent<HTMLInputElement> не успокоил ts  пришлось any
        setImg(e.target.files[0])
    }

    //вызываем скрытый инпут(файлПикер)
    const handlePick = () => filePicker.current.click()

    const CheckForDuplicateLogin: () => boolean = () => {
        return users?.some(user => user.login === text)
    }

    return (
        <Spin spinning={isLoading} tip='Loading' size='large'>
            <Form
                onFinish={onFinish}
                name='registration'
                style={{ maxWidth: 1200 }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                {CheckForDuplicateLogin() && (
                    <p className='mb-2 text-center text-red-500'>Такой логин уже существует!</p>
                )}
                <Form.Item
                    label='Логин'
                    name='login'
                    rules={[{ required: true, message: 'Пожалуйста введите свой логин!' }]}
                >
                    <Input
                        autoComplete='off'
                        prefix={<UserOutlined className='site-form-item-icon' />}
                        placeholder='Логин'
                        onChange={e => onChangeInputLogin(e)}
                        status={CheckForDuplicateLogin() ? 'error' : ''}
                    />
                </Form.Item>

                <Form.Item
                    label='Имя'
                    name='name'
                    rules={[{ required: true, message: 'Пожалуйста укажите своё имя!' }]}
                >
                    <Input
                        autoComplete='off'
                        prefix={<UserOutlined className='site-form-item-icon' />}
                        placeholder='Имя'
                    />
                </Form.Item>

                <Form.Item
                    label='Пароль'
                    name='password'
                    rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                >
                    <Input.Password
                        autoComplete='off'
                        prefix={<LockOutlined className='site-form-item-icon' />}
                        placeholder='Пароль'
                    />
                </Form.Item>

                <Form.Item
                    label='Аватар'
                    name='picture'
                    // valuePropName='fileList'
                    // getValueFromEvent={getFile}
                    // rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                >
                    {/* <div className='flex items-center'> */}
                    {/* <Upload maxCount={1} listType={'picture'} onClick={handlePick}>
            <Button icon={<UploadOutlined />}>Click</Button>
          </Upload> */}
                    <Button onClick={handlePick} icon={<UploadOutlined />}>
                        Click
                    </Button>
                    {img && (
                        <p className='mt-3 text-ellipsis overflow-hidden w-[190px] whitespace-nowrap'>{img.name}</p>
                    )}
                    {/* </div> */}
                </Form.Item>
                <input
                    ref={filePicker}
                    type='file'
                    onChange={handleUpload}
                    // defaultValue={defaultImg}
                    accept='image/*,.png,.jpg,.gif,.web'
                    className='opacity-0 w-0 h-0 leading-[0px] overflow-hidden p-0 m-0 '
                />

                <Form.Item label='Цвет' name='color' rules={[{ message: 'Пожалуйста выберите цвет!' }]}>
                    <div className='flex items-center'>
                        <Select
                            value={color}
                            onChange={handleChange}
                            options={COLORS}
                            style={{ width: '83%' }}
                            //     : { backgroundColor: 'white', width: 120 }
                            // }
                        />
                        <div
                            className='rounded-full w-[25px] h-[25px] ml-2 justify-center'
                            style={color ? { backgroundColor: color } : { backgroundColor: 'white' }}
                        ></div>
                    </div>
                </Form.Item>

                <Row justify={'center'}>
                    <Form.Item wrapperCol={{ span: 18 }}>
                        <Button disabled={CheckForDuplicateLogin()} type='primary' htmlType='submit'>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </Spin>
    )
}

export default RegistrationForm
