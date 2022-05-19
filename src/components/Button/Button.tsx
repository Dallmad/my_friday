import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    callBack?: () => void
    buttonName?: string
}

const Button: React.FC<SuperButtonPropsType> = (
    {
        red, className, callBack, buttonName,
        ...restProps
    }
) => {

    const finalClassName = `${className ? className :red ? s.buttonRed: s.button}`



    return (

            <button
            className={finalClassName}
            onClick={callBack}
            {...restProps}
        >
                {buttonName}
            </button>

    )
}

export default Button
