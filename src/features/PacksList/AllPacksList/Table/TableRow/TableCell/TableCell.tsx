import Input from '../../../../../../components/Input/Input';


export const TableCell = ({packValue}: PackValueType) => {

    return (
        <div>
            <Input value={packValue}/>
        </div>
    )
}
//types
type PackValueType = {
    packValue: string | number
}
