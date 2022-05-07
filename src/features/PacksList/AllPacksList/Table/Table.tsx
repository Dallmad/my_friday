import {TableRow} from './TableRow/TableRow';
import {AppRootStateType, useTypedDispatch} from '../../../../state/store';
import {useEffect} from 'react';
import {fetchPacksTC, ResponsePackType} from '../../../../state/packs-reducer';
import {useSelector} from 'react-redux';
import {TableHeader} from './TableHeader/TableHeader';
import s from '../AllPacksList.module.css'

export const Table = () => {

    const dispatch = useTypedDispatch()
    const packs = useSelector<AppRootStateType, ResponsePackType[]>(state => state.packs.cardPacks)

    useEffect(() => {
        dispatch(fetchPacksTC())
    }, [])

    return (

    <div className={s.table}>
        <TableHeader/>
        {packs.map((cardPacks) => <TableRow
                key={cardPacks._id + cardPacks.user_id}
                cardPacks={cardPacks}
            />
        )}
    </div>

    )
}