import '../../../AllPacksList.module.css'

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
