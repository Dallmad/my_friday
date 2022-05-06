import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState} from 'react'

import s from './EditableSpan.module.css'
import Input from '../Input/Input';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperEditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType // пропсы для спана
    profileName?:string
}

const EditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,
        profileName,

        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false)
        onEnter && onEnter()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)
        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
        onDoubleClick && onDoubleClick(e)
    }

    // const spanClassName = `${s.span} ${className}`

    return (
        <>
            {editMode
                ? (
                    <Input
                        autoFocus
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}
                        {...restProps}
                        value={profileName}
                        label={'Nickname'}
                    />
                ) : (
                    <Input onDoubleClick={onDoubleClickCallBack}
                           className={s.superInput}
                           value={profileName}
                           label={'Nickname'}
                    />
                )
            }
        </>
    )
}

export default EditableSpan
