import s from '../../AllPacksList.module.css'
import Input from '../../../../../components/Input/Input';


export const TableHeader = () => {

    const headersName = ['Name', 'Cards', 'Last Updates', 'Created by', 'Actions']

    return (
        <div className={s.table_row}>
            {headersName.map((h,i) => <Input key={h+i} value={h}/>)}
        </div>
    )
};