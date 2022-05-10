import '../../AllPacksList.module.css'
import Input from '../../../../../components/Input/Input';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../../state/store';
import {useEffect, useState} from 'react';
import {setSortPacksAC} from '../../../../../state/packs-reducer';
import Button from '../../../../../components/Button/Button';

type PropsType = {
    sortPacks:string
}

export const TableHeader = ({sortPacks}:PropsType) => {

    const dispatch = useDispatch()
   /* const sortPacks = useSelector<AppRootStateType, string>(state => state.packs.sortPacks)*/
    //const [newSortPacks, setNewSortPacks] = useState(sortPacks)

/*
    useEffect(() => {
        dispatch(setSortPacksAC(sortPacks))
    }, [newSortPacks])
*/


    const onSortPacks = (value: string) => {
        //let direction = sortPacks.slice(0, 1)
        let sort = +!+sortPacks.slice(0, 1)+value
        //setNewSortPacks(sort)
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


        /*<div className={s.table_row}>
            {headersName.map((h, i) =>
                <Input
                    key={h + i} value={h}
                    onClick={handler(h)}
                />
            )}
        </div>*/
    )
};