import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: string[]
    onChangeOption?: (option: string) => void
}

const Radio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
        // onChange, onChangeOption
    }


    const mappedOptions: JSX.Element[] = options ? options.map((o, i) => (
        <label key={name + '-' + i}>
            <div>
            <input
                type={'radio'}
                name={name}
                checked={o===value}
                value={o}
                onChange={onChangeCallback}
            />
            {o}
            </div>
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default Radio
