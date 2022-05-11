import {TableCell} from './TableCell/TableCell';
import {deletePackTC, ResponsePackType, updatedPackTC} from '../../../../../state/packs-reducer';
import '../../AllPacksList.module.css'
import Button from '../../../../../components/Button/Button';
import {AppRootStateType, useTypedDispatch} from '../../../../../state/store';
import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../../../app/Routes/Routes';
import {useSelector} from "react-redux";


export const TableRow = ({cardPacks}: ResponseCardPackType) => {
    const {name, cardsCount, updated, user_name, _id, user_id} = cardPacks

    const myUserId = useSelector<AppRootStateType, string>(state => state.profile._id)

    const dispatch = useTypedDispatch()
    const [changePageToCard, setChangePageToCard] = useState(false)

    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const editPackHandler = (cardPacks: ResponsePackType) => {
        dispatch(updatedPackTC(cardPacks))
    }

    if (changePageToCard) {
        return <Navigate to={PATH.ALL_PACKS_LIST + '/' + _id}/>
    }

    return (
        <tr>
            <td onClick={() => setChangePageToCard(true)}>
                {name}
            </td>
            <TableCell packValue={cardsCount}/>
            <TableCell packValue={updated}/>
            <TableCell packValue={user_name}/>
            <td className="button">
                {myUserId === user_id && <Button onClick={() => deletePackHandler(_id)}>Delete</Button>}
                {myUserId === user_id && <Button onClick={() => editPackHandler(cardPacks)}>Edit</Button>}
                <Button onClick={() => setChangePageToCard(true)}>Learn</Button>
            </td>
        </tr>
    )
}

//types
type ResponseCardPackType = {
    cardPacks: ResponsePackType
}
