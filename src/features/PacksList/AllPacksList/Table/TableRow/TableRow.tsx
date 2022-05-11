import {TableCell} from './TableCell/TableCell';
import {deletePackTC, ResponsePackType, updatedPackTC} from '../../../../../state/packs-reducer';
import '../../AllPacksList.module.css'
import Button from '../../../../../components/Button/Button';
import {AppRootStateType, useTypedDispatch} from '../../../../../state/store';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../../app/Routes/Routes';
import {useSelector} from "react-redux";


export const TableRow = ({cardPacks}: ResponseCardPackType) => {
    const {name, cardsCount, updated, user_name, _id, user_id} = cardPacks

    const myUserId = useSelector<AppRootStateType, string>(state => state.profile._id)

    const navigate = useNavigate()
    const dispatch = useTypedDispatch()

    const deletePackHandler = (id: string) => {
        dispatch(deletePackTC(id))
    }
    const editPackHandler = (cardPacks: ResponsePackType) => {
        dispatch(updatedPackTC(cardPacks))
    }

    const setChangePageToCard = () => {
        navigate(`${PATH.ALL_PACKS_LIST}/${_id}`)
    }

    return (
        <tr>
            <td onClick={setChangePageToCard}>
                {name}
            </td>
            <TableCell packValue={cardsCount}/>
            <TableCell packValue={updated}/>
            <TableCell packValue={user_name}/>
            <td className="button">
                {myUserId === user_id && <Button onClick={() => deletePackHandler(_id)}>Delete</Button>}
                {myUserId === user_id && <Button onClick={() => editPackHandler(cardPacks)}>Edit</Button>}
                <Button onClick={setChangePageToCard}>Learn</Button>
            </td>
        </tr>
    )
}

//types
type ResponseCardPackType = {
    cardPacks: ResponsePackType
}
