import s from './TestPage.module.css'
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Input from '../../components/Input/Input';
import EditableSpan from "../../components/EditableSpan/EditableSpan";

export const TestPage = () => {

    return (
        <div className={s.div}>
            <div className={s.container}>
                <Button>Some Button</Button>
                <Checkbox/>
                <EditableSpan />
                <Input/>
            </div>
        </div>
    )
}