import {TableCell} from './TableCell/TableCell';
import {ResponsePackType} from '../../../../../state/packs-reducer';


export const TableRow = ({cardPacks}: ResponseCardPackType) => {

const {name, cardsCount, updated, user_name} = cardPacks

    return (
        <div>
            <TableCell packValue={name} />
            <TableCell packValue={cardsCount} />
            <TableCell packValue={updated} />
            <TableCell packValue={user_name} />
            <TableCell packValue={'actions'} />
        </div>
    )
}

//types
type ResponseCardPackType= {
    cardPacks: ResponsePackType
}