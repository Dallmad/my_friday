import s from './TestPage.module.css'
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import EditableSpan from '../../components/EditableSpan/EditableSpan';
import Input from '../../components/Input/Input';
import Radio from '../../components/Radio/Radio';
import Select from '../../components/Select/Select';
import {useState} from 'react';

export const TestPage = () => {

    return (
        <div className={s.div}>
            <div className={s.container}>
                <Button>Some Button</Button>
                <Checkbox/>
                <EditableSpan/>
                <Input/>
            </div>
        </div>
    )
}