import {TableCell} from './TableCell/TableCell';
import {deletePackTC, ResponsePackType, updatedPackTC} from '../../../../../state/packs-reducer';
import '../../AllPacksList.module.css'
import Button from '../../../../../components/Button/Button';
import {useTypedDispatch} from '../../../../../state/store';


export const TableRow = ({cardPacks}: ResponseCardPackType) => {
    const {name, cardsCount, updated, user_name, _id} = cardPacks

    const dispatch = useTypedDispatch()


    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const editPackHandler = (cardPacks: ResponsePackType) => {
        dispatch(updatedPackTC(cardPacks))
    }
    const openPackHandler = () => {

    }

    return (
        <tr>
            <TableCell packValue={name}/>
            <TableCell packValue={cardsCount}/>
            <TableCell packValue={updated}/>
            <TableCell packValue={user_name}/>
            <td className="button">
                {true && <Button onClick={()=>deletePackHandler(_id)}>Delete</Button>}
                {true && <Button onClick={()=>editPackHandler(cardPacks)}>Edit</Button>}
                {true && <Button onClick={openPackHandler}>Learn</Button>}
            </td>
        </tr>
    )
}

//types
type ResponseCardPackType = {
    cardPacks: ResponsePackType
}