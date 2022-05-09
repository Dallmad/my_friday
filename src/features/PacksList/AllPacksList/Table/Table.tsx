import {TableRow} from './TableRow/TableRow';
import {AppRootStateType, useTypedDispatch} from '../../../../state/store';
import {useEffect} from 'react';
import {fetchMyPacksTC, fetchPacksTC, ResponsePackType} from '../../../../state/packs-reducer';
import {useSelector} from 'react-redux';
import {TableHeader} from './TableHeader/TableHeader';
import s from '../AllPacksList.module.css'



export const Table = () => {

    const dispatch = useTypedDispatch()
    const isMyPage = useSelector<AppRootStateType, boolean>(state => state.packs.isMyPage)

    const packs = useSelector<AppRootStateType, ResponsePackType[]>(state => state.packs.cardPacks)
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id)
    useEffect(() => {
        if (!isMyPage) {
            dispatch(fetchPacksTC())//
        } else dispatch(fetchMyPacksTC(userId))//need _id
    }, [isMyPage])

/*    if (changePage) {
        return <Navigate to={'/my-packs-list'}/>
    }*/
    return (
        <div className={s.table}>
            <TableHeader/>
            {packs.map((p) =>
                <TableRow
                    key={p._id + p.user_id}
                    cardPacks={p}
                />
            )}
        </div>

    )
}

//types
/*
type ChangePageType = {
    changePage: boolean
}
*/
