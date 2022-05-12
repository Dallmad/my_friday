import '../../AllPacksList.module.css'
import {useDispatch} from 'react-redux';
import {setSortPacksAC} from '../../../../../state/packs-reducer';

export const TableHeader = ({sortPacks}:PropsType) => {

    const dispatch = useDispatch()

    const onSortPacks = (value: string) => {
        let sort = +!+sortPacks.slice(0, 1)+value
        dispatch(setSortPacksAC(sort))
    }

    return (
        <tr>
            <th onClick={()=>onSortPacks('name')}>Name</th>
            <th onClick={()=>onSortPacks('cardsCount')}>Cards</th>
            <th onClick={()=>onSortPacks('updated')}>Last Updates</th>
            <th onClick={()=>onSortPacks('created')}>Created by</th>
            <th>Actions</th>
        </tr>
    )
}
//types
type PropsType = {
    sortPacks:string
}