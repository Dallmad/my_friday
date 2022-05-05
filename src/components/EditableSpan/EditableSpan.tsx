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
}

const EditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,

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
                        // label={'labelName'}
                    />
                ) : (
                    // <span
                    //     onDoubleClick={onDoubleClickCallBack}
                    //     className={spanClassName}
                    //
                    //     {...restSpanProps}
                    // >
                    //     {/*<img*/}
                    //     {/*// src="https://w7.pngwing.com/pngs/122/292/png-transparent-black-and-white-pencil-silhouette-drawing-pencil-angle-white-pencil.png"/>*/}
                    //     {children || restProps.value}
                    // </span>
                    <Input onDoubleClick={onDoubleClickCallBack}
                           className={s.superInput}
                           // label={'labelName'}
                    />
                )
            }
        </>
    )
}

export default EditableSpan
