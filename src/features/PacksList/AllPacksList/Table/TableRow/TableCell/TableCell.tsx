
import '../../../AllPacksList.module.css'
import Button from '../../../../../../components/Button/Button';


export const TableCell = ({packValue}: PackValueType) => {

    return (
        <>
            <td>{packValue}</td>
        </>
    )
}

//types
type PackValueType = {
    packValue: string | number
}
