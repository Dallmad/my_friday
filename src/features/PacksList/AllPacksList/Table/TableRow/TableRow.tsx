import {TableCell} from './TableCell/TableCell';
import {deletePackTC, ResponsePackType, updatedPackTC} from '../../../../../state/packs-reducer';
import '../../AllPacksList.module.css'
import Button from '../../../../../components/Button/Button';
import {useTypedDispatch} from '../../../../../state/store';
import {setCardsIdTC} from '../../../../../state/cadrs-reducer';
import {useState} from 'react';
import { Navigate } from 'react-router-dom';
import {PATH} from '../../../../../app/Routes/Routes';


export const TableRow = ({cardPacks}: ResponseCardPackType) => {
    const {name, cardsCount, updated, user_name, _id} = cardPacks

    const dispatch = useTypedDispatch()
const [changePageToCard,setChangePageToCard] = useState(false)

    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const editPackHandler = (cardPacks: ResponsePackType) => {
        dispatch(updatedPackTC(cardPacks))
    }
    const openPackHandler = () => {
        dispatch(setCardsIdTC(cardPacks._id))
        setChangePageToCard(true)
    }
if (changePageToCard) {
    return <Navigate to={PATH.CARDS}/>
}


    return (
        <tr>
            <TableCell packValue={name}/>
            <TableCell packValue={cardsCount}/>
            <TableCell packValue={updated}/>
            <TableCell packValue={user_name}/>
            <td className="button">
                {true && <Button onClick={() => deletePackHandler(_id)}>Delete</Button>}
                {true && <Button onClick={() => editPackHandler(cardPacks)}>Edit</Button>}
                <Button onClick={openPackHandler}>Learn</Button>
            </td>
        </tr>
    )
}

//types
type ResponseCardPackType = {
    cardPacks: ResponsePackType
}