import { ColorPicker, Form } from 'antd'
import { Color } from 'antd/es/color-picker'
import React, { FC, useState } from 'react'

interface IProps {
    color: string | Color
    setColor: (value: Color, hex: string) => void
}

const ColorPickerForm: FC<IProps> = ({ color, setColor }) => {
    return (
        <Form.Item label='Цвет' initialValue={color} name='color'>
            <ColorPicker onChange={setColor} value={color} />
        </Form.Item>
    )
}

export default ColorPickerForm
