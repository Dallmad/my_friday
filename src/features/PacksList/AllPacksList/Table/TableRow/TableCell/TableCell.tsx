import Input from '../../../../../../components/Input/Input';
import s from '../../../AllPacksList.module.css'


export const TableCell = ({packValue}: PackValueType) => {

    return (
        <div className={s.table_cell}>
            <Input value={packValue}/>
        </div>
    )
}
//types
type PackValueType = {
    packValue: string | number
}
